import math

for a in range(1, 10000000):
  x = math.sqrt(11 * a ** 2 + 3)
  if x == math.floor(x):
    print(x)
    break