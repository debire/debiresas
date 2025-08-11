#Ebire Oluwadamilare Ebire
#21/1884
def concatenate_months_days(*args):
    if len(args) != 2:
        raise ValueError("Function requires exactly two lists: monthhs and days")
        months,days = args
        if len(months)!= len(days):
            raise ValueError("Both lists must have the same length")

            return [f"{month}{day}" for month, day in zip (months,days)]

            A=["Jan", "Feb", "Mar", "Apr", "May","Jun","Jul", "Aug","Sep", "Oct","Nov", "Dec"]
            B=[31,28,31,30,31,30,31,31,30,31,30,31]
            x= concatenate_months_days(A,B)
            print(x)


#number 2
import math
def calculate_total_area():
    square_side=10
    circle_radius=5

    square_area = square_side**2
    circle_area = math.pi* (circle_radius**2)

    total_area = square_area + circle_area
    return total_area

    result = calculate_total_area()
    print(f"Total Area: {result:2f}")