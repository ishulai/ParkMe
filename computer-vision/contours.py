import numpy as np
import cv2 as cv
import json
import time
import sys

class ContourFinder:

    # Legacy - Convert to a gray filter and draw contours
    def findContour(self, im):
        imgray = cv.cvtColor(im, cv.COLOR_BGR2GRAY)
        ret, thresh = cv.threshold(imgray, 80, 255, 0) #127
        im, contours, hierarchy = cv.findContours(thresh, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
        cv.drawContours(im, contours, -1, (0,255,0), 3)
        return im

    # Find lines using a canny filter and HoughLines algorithm
    def findLines(self, im, isEdges=False):
        low_threshold = 50
        high_threshold = 150
        edges = cv.Canny(im, low_threshold, high_threshold)
        if isEdges:
            edges = im
        #cv.imshow("edges", edges)
        rho = 1  # distance resolution in pixels of the Hough grid
        theta = np.pi / 180  # angular resolution in radians of the Hough grid
        threshold = 20  # minimum number of votes (intersections in Hough grid cell)
        min_line_length = 100  # minimum number of pixels making up a line
        max_line_gap = 14#12#20  # maximum gap in pixels between connectable line segments
        line_image = np.copy(im) * 0  # creating a blank to draw lines on

        # Run Hough on edge detected image
        # Output "lines" is an array containing endpoints of detected line segments
        lines = cv.HoughLinesP(edges, rho, theta, threshold, np.array([]),
                            min_line_length, max_line_gap)
        return line_image, lines

    # Helper methods
    def _dist(self, x1,y1,x2,y2):
        d = (x2-x1)**2 + (y2-y1)**2
        return int(d ** 0.5)

    def _slope(self, x1,y1,x2,y2):
        if x2-x1 == 0:
            return 999
        s = 1.0 * (y2-y1)/(x2-x1)
        return s

    def _bound(self, num, lower, upper):
        num = abs(num)
        if num < lower or num > upper:
            return False
        return True

    # Checks to filter bad lines
    def _filterLines(self, x1,y1,x2,y2):
        LEN_THRESH = 150
        SLOPE_THRESH = (.2, .5)
        if self._dist(x1,y1,x2,y2) < LEN_THRESH:
            return False #not long enough
        if min(y1,y2) < 1.0 * self.dim[1]/3.5:
            return False #too high
        if max(y1,y2) < 1.0 * self.dim[1]/2.5:
            return False #too high
        slope = self._slope(x1,y1,x2,y2)
        if not self._bound(slope, SLOPE_THRESH[0], SLOPE_THRESH[1]):
            return False
        if slope > 0 and max(x1, x2) < 3 * self.dim[1]/4:
            return False
        if slope < 0 and min(x1, x2) > 1 * self.dim[1]/4:
            return False
        return True

    # Draw lines on the image and filter bad lines
    def drawLines(self, line_image, lines):
        new_lines = []
        if lines is None:
            return []
        for line in lines:
            for x1,y1,x2,y2 in line:
                 if self._filterLines(x1,y1,x2,y2):
                    cv.line(line_image,(x1,y1),(x2,y2),(255,0,0),5)
                    new_lines.append((x1,y1,x2,y2))
        print(str(len(new_lines)) + " lines found")
        return new_lines

    # Deprecated
    def getCars(self):
        f = open("cv.txt", 'r')
        data = json.loads(f.read())["localizedObjectAnnotations"]
        res = []
        for obj in data:
            if obj["name"] == "Car":
                coords = obj["boundingPoly"]["normalizedVertices"]
                res.append(self._getCoords(coords))
        return res

    # 0,0 is upper left corner
    def _getCoords(self, coords):
        # If car is bigger than half of pic, thats not on the curb.
        if (coords[3]["x"] - coords[2]["x"]) > 0.5:
            return
        elif coords[3]["x"] < 0.5: # lower left of box is on the left
            return coords[0]
        elif coords[2]["x"] > 0.5:
            return coords[1]

    # Deprecated
    def extendLines(self, lines, coords):
        print(lines)

    # -1 = left, 0 = none, 1 = right
    def makeRes(self, lines):
        ans = 0
        if len(lines) == 0:
            return 0
        for x1,y1,x2,y2 in lines:
            if max(x1, x2) > self.dim[1]/2:
                ans += 1
            else:
                ans -= 1
        if ans > 0:
            return 1
        else:
            return -1

    # Legacy
    def run(self):
        name = 'parking2.JPG'
        name = '2.png'
        im = cv.imread(name)
        self.dim = im.shape
        im2 = self.findContour(im)
        line_image, lines = self.findLines(im2)
        lines = self.drawLines(line_image, lines)
        #coords = self.getCars()
        #self.extendLines(lines, coords)
        final = cv.addWeighted(im2, 0.8, line_image, 1, 0)
        cv.imwrite("contours.jpg", final)

        final = cv.imread('contours.jpg')
        final = cv.resize(final, (1920/2, 1080/2))  
        cv.imshow("final", final)
        cv.waitKey(0)

    # Where all the methods are run
    def runLive(self, debug=0, keepWindow=False):
        if debug == 2:
            cap = cv.VideoCapture(0)
        else:
            cap = None
        success = 1
        count = 0
        vidObj = cv.VideoCapture("sped.mp4")
        while success: 
            if cap:
                ret, frame = cap.read()
            
            if debug == 2:
                if (vidObj.isOpened()== False): 
                    print("Error opening video stream or file")
                success, image = vidObj.read() 
                frame = image
                try:
                    frame = cv.resize(frame, (1920/2, 1080/2))
                except:
                    cap.release()
                    cv.destroyAllWindows()
                    sys.exit(0)
                while count < 1 and success:
                    success, image = vidObj.read()
                    count += 1
                time.sleep(.0005)
                count = 0
            elif debug != 0:
                name = debug#'frame2.jpg'
                frame = cv.imread(name)
                frame = cv.resize(frame, (1920/2, 1080/2))
            
            self.dim = frame.shape
            hsv = cv.cvtColor(frame, cv.COLOR_BGR2HSV) 
            lower_red = np.array([30,150,50]) 
            upper_red = np.array([255,255,180]) 
            mask = cv.inRange(hsv, lower_red, upper_red) 
            res = cv.bitwise_and(frame,frame, mask= mask) 

            # Display an original image 
            cv.imshow('Original',frame) 

            edges = cv.Canny(frame,100,200)
            line_image, lines = self.findLines(edges, True)
            lines = self.drawLines(line_image, lines)
            if debug != 0:
                final = cv.addWeighted(edges, 0.8, line_image, 1, 0)
                cv.imshow('Edges',final)
                #cv.imshow('Lines',line_image)

                # Wait for Esc key to stop 
                k = cv.waitKey(5) & 0xFF
                if k == 27: 
                    break
                if debug != 2 and not keepWindow:
                    success = 0
                    if cap:
                        cap.release()
                    cv.destroyAllWindows()
                    res = self.makeRes(lines)
                    print(res)
                    return res
        if cap:
            cap.release()
        cv.destroyAllWindows() 

if __name__ == "__main__":
    cf = ContourFinder()
    #cf.run()
    cf.runLive(debug=2)#"frame2.jpg", keepWindow=True)#debug=2)
