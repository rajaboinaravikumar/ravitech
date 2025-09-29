 import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronRight, Play, CheckCircle, Circle, Book, Trophy, ChevronLeft, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import CodePlayground from '../components/CodePlayground';
import toast from 'react-hot-toast';

const CoursePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user, enrollInCourse, markTopicComplete, isTopicComplete } = useAuth();
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showPlayground, setShowPlayground] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const courseData: { [key: string]: any } = {
     'python-basics': {
  title: 'Python Fundamentals',
  description: 'Master Python from basics to advanced concepts with practical examples',
  totalTopics: 35,
  topics: [
    {
      id: 'installation',
      title: 'Installing Python 3',
      content: `
        <h3>Setting Up Python Development Environment</h3>
        <p>Learn how to install Python and set up your development environment properly.</p>
        
        <h4>Installation Steps:</h4>
        <ul>
          <li>Download Python from python.org</li>
          <li>Verify installation using command line</li>
          <li>Set up code editor (VS Code recommended)</li>
          <li>Install essential extensions</li>
        </ul>
      `,
      code: `# Verify Python installation
python --version

# Start Python interpreter
python

# Exit interpreter
exit()`,
      language: 'bash',
      exercise: 'Install Python and verify it works by running python --version in terminal'
    },
    {
      id: 'first-program',
      title: 'Your First Python Program',
      content: `
        <h3>Writing and Running Python Code</h3>
        <p>Create your first Python program and understand how to execute it.</p>
      `,
      code: `# Your first Python program
print("Welcome to Python Programming!")
print("This is my first program")

# Multiple print statements
print("Hello,")
print("World!")

# Print with variables
name = "Ravi Ram"
print("My name is:", name)`,
      language: 'python',
      exercise: 'Create a program that prints your name, age, and favorite hobby'
    },
    {
      id: 'execution',
      title: 'How Python Code Gets Executed',
      content: `
        <h3>Understanding Python Execution Model</h3>
        <p>Learn how Python code is interpreted and executed line by line.</p>
        
        <h4>Execution Process:</h4>
        <ul>
          <li>Code parsing and compilation to bytecode</li>
          <li>Bytecode execution in Python Virtual Machine (PVM)</li>
          <li>Line-by-line interpretation</li>
        </ul>
      `,
      code: `# Demonstration of execution order
print("This runs first")

x = 10
print(f"x is assigned: {x}")

def hello():
    print("Function executed when called")

print("This runs before function")
hello()
print("This runs after function")`,
      language: 'python',
      exercise: 'Create a program that demonstrates the order of execution with multiple functions'
    },
    {
      id: 'variables-input',
      title: 'Variables and Receiving Input',
      content: `
        <h3>Working with Variables and User Input</h3>
        <p>Learn to store data in variables and get input from users.</p>
      `,
      code: `# Variable assignment
name = "Alice"
age = 25
height = 5.6
is_student = True

# Receiving input
user_name = input("Enter your name: ")
user_age = input("Enter your age: ")

print(f"Hello {user_name}, you are {user_age} years old!")

# Type conversion
birth_year = int(input("Enter your birth year: "))
current_year = 2025
age = current_year - birth_year

print(f"You are {age} years old!")`,
      language: 'python',
      exercise: 'Create a program that asks for user information and displays it formatted'
    },
    {
      id: 'string-methods',
      title: 'String Methods',
      content: `
        <h3>Manipulating Text with String Methods</h3>
        <p>Python provides powerful methods to work with text data.</p>
      `,
      code: `text = "hello world python programming"

# Common string methods
print("Original:", text)
print("Uppercase:", text.upper())
print("Lowercase:", text.lower())
print("Title case:", text.title())
print("Capitalize:", text.capitalize())

# Searching and replacing
print("Contains 'world':", "world" in text)
print("Find 'python':", text.find("python"))
print("Replace 'hello' with 'hi':", text.replace("hello", "hi"))

# Splitting and joining
words = text.split()
print("Split words:", words)
print("Joined with hyphen:", "-".join(words))

# String formatting
name = "Ravi"
age = 25
print(f"My name is {name} and I'm {age} years old")`,
      language: 'python',
      exercise: 'Create a program that processes a sentence and demonstrates 5 different string methods'
    },
    {
      id: 'arithmetic-operations',
      title: 'Arithmetic Operations',
      content: `
        <h3>Mathematical Operations in Python</h3>
        <p>Perform basic and advanced mathematical calculations.</p>
      `,
      code: `# Basic arithmetic
a = 15
b = 4

print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b}")
print(f"{a} % {b} = {a % b}")  # Modulus
print(f"{a} ** {b} = {a ** b}")  # Exponentiation
print(f"{a} // {b} = {a // b}")  # Floor division

# Compound assignments
x = 10
x += 5  # x = x + 5
print("After += 5:", x)

x *= 2  # x = x * 2
print("After *= 2:", x)`,
      language: 'python',
      exercise: 'Create a program that calculates area and perimeter of a rectangle'
    },
    {
      id: 'operator-precedence',
      title: 'Operator Precedence',
      content: `
        <h3>Understanding Operator Priority</h3>
        <p>Learn which operations are performed first in complex expressions.</p>
      `,
      code: `# Operator precedence examples
result1 = 10 + 3 * 2  # Multiplication first
result2 = (10 + 3) * 2  # Parentheses first
result3 = 10 + 3 * 2 ** 2  # Exponentiation first

print(f"10 + 3 * 2 = {result1}")
print(f"(10 + 3) * 2 = {result2}")
print(f"10 + 3 * 2 ** 2 = {result3}")

# Complex expression
a = 5
b = 3
c = 2
result = a + b * c ** 2 / 4 - 1
print(f"5 + 3 * 2 ** 2 / 4 - 1 = {result}")

# Breaking it down step by step
step1 = 2 ** 2  # 4
step2 = 3 * step1  # 12
step3 = step2 / 4  # 3
step4 = 5 + step3  # 8
step5 = step4 - 1  # 7
print("Step by step calculation:", step5)`,
      language: 'python',
      exercise: 'Create complex mathematical expressions and predict the result before running'
    },
    {
      id: 'math-functions',
      title: 'Math Functions',
      content: `
        <h3>Advanced Mathematical Operations</h3>
        <p>Use Python's math module for complex calculations.</p>
      `,
      code: `import math

# Basic math functions
print("Square root of 16:", math.sqrt(16))
print("Power:", math.pow(2, 3))
print("Absolute value:", math.abs(-5))

# Trigonometric functions
angle = math.radians(45)  # Convert to radians
print("Sin 45°:", math.sin(angle))
print("Cos 45°:", math.cos(angle))

# Constants
print("Pi:", math.pi)
print("Euler's number:", math.e)

# Rounding and ceiling
print("Round 3.7:", round(3.7))
print("Ceil 3.2:", math.ceil(3.2))
print("Floor 3.9:", math.floor(3.9))

# Logarithmic functions
print("Log base 10 of 100:", math.log10(100))
print("Natural log of 10:", math.log(10))`,
      language: 'python',
      exercise: 'Create a program that calculates circle area and circumference using math.pi'
    },
    {
      id: 'if-statements',
      title: 'If Statements',
      content: `
        <h3>Conditional Logic with If Statements</h3>
        <p>Make decisions in your code based on conditions.</p>
      `,
      code: `# Basic if statement
age = 18

if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")

# Multiple conditions
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Score: {score}, Grade: {grade}")

# Nested if statements
temperature = 25
is_raining = False

if temperature > 30:
    if is_raining:
        print("Hot and rainy - stay inside")
    else:
        print("Hot but dry - go swimming")
elif temperature > 20:
    print("Perfect weather for outdoor activities")
else:
    print("Too cold - stay inside")`,
      language: 'python',
      exercise: 'Create a program that checks if a number is even or odd'
    },
    {
      id: 'logical-operators',
      title: 'Logical Operators',
      content: `
        <h3>Combining Conditions with Logical Operators</h3>
        <p>Use AND, OR, NOT to create complex conditions.</p>
      `,
      code: `# Logical operators: and, or, not
age = 25
has_license = True
has_car = False

# AND operator (both conditions must be True)
if age >= 18 and has_license:
    print("You can drive legally")
else:
    print("You cannot drive")

# OR operator (at least one condition True)
if has_car or has_license:
    print("You have transportation options")
else:
    print("You need to arrange transportation")

# NOT operator (reverses the condition)
if not has_car:
    print("You don't have a car")

# Complex conditions
temperature = 22
is_weekend = True
is_sunny = True

if (temperature > 20 and is_sunny) or is_weekend:
    print("Good day for outdoor activities")
else:
    print("Better stay inside")

# Combining multiple operators
score = 75
attendance = 90

if (score >= 70 and attendance >= 80) or score >= 90:
    print("You pass the course")
else:
    print("You need to improve")`,
      language: 'python',
      exercise: 'Create a login system that checks username and password'
    },
    {
      id: 'comparison-operators',
      title: 'Comparison Operators',
      content: `
        <h3>Comparing Values in Python</h3>
        <p>Learn to compare values using various comparison operators.</p>
      `,
      code: `# Comparison operators
a = 10
b = 5
c = 10

print(f"{a} == {c}: {a == c}")  # Equal to
print(f"{a} != {b}: {a != b}")  # Not equal to
print(f"{a} > {b}: {a > b}")    # Greater than
print(f"{a} < {b}: {a < b}")    # Less than
print(f"{a} >= {c}: {a >= c}")  # Greater than or equal to
print(f"{b} <= {a}: {b <= a}")  # Less than or equal to

# String comparisons
name1 = "Alice"
name2 = "Bob"
name3 = "Alice"

print(f"'{name1}' == '{name3}': {name1 == name3}")
print(f"'{name1}' != '{name2}': {name1 != name2}")
print(f"'{name1}' < '{name2}': {name1 < name2}")  # Alphabetical order

# Boolean comparisons
x = True
y = False

print(f"True == True: {x == x}")
print(f"True != False: {x != y}")

# Chained comparisons
age = 25
print("18 <= age <= 30:", 18 <= age <= 30)`,
      language: 'python',
      exercise: 'Create a program that compares two numbers and shows all comparison results'
    },
    {
      id: 'weight-converter',
      title: 'Weight Converter Program',
      content: `
        <h3>Practical Project: Weight Converter</h3>
        <p>Build a useful application that converts between different weight units.</p>
      `,
      code: `def weight_converter():
    print("=== Weight Converter ===")
    print("1. Kilograms to Pounds")
    print("2. Pounds to Kilograms")
    print("3. Kilograms to Ounces")
    print("4. Ounces to Kilograms")
    
    choice = input("Enter your choice (1-4): ")
    
    if choice in ['1', '2', '3', '4']:
        try:
            weight = float(input("Enter weight: "))
            
            if choice == '1':
                # KG to Pounds (1 kg = 2.20462 lbs)
                result = weight * 2.20462
                print(f"{weight} kg = {result:.2f} lbs")
            elif choice == '2':
                # Pounds to KG (1 lb = 0.453592 kg)
                result = weight * 0.453592
                print(f"{weight} lbs = {result:.2f} kg")
            elif choice == '3':
                # KG to Ounces (1 kg = 35.274 oz)
                result = weight * 35.274
                print(f"{weight} kg = {result:.2f} oz")
            elif choice == '4':
                # Ounces to KG (1 oz = 0.0283495 kg)
                result = weight * 0.0283495
                print(f"{weight} oz = {result:.4f} kg")
        except ValueError:
            print("Please enter a valid number!")
    else:
        print("Invalid choice!")

# Run the converter
weight_converter()`,
      language: 'python',
      exercise: 'Add more conversion options like grams to ounces or stones to pounds'
    },
    {
      id: 'while-loops',
      title: 'While Loops',
      content: `
        <h3>Repetition with While Loops</h3>
        <p>Execute code repeatedly while a condition is true.</p>
      `,
      code: `# Basic while loop
count = 1
while count <= 5:
    print(f"Count: {count}")
    count += 1

print("Loop finished!")

# While loop with user input
total = 0
number = int(input("Enter a number (0 to stop): "))

while number != 0:
    total += number
    number = int(input("Enter a number (0 to stop): "))

print(f"Total sum: {total}")

# Infinite loop with break
while True:
    command = input("Enter command (quit to exit): ")
    if command.lower() == "quit":
        break
    print(f"Executing: {command}")

print("Program ended")

# Continue statement
number = 0
while number < 10:
    number += 1
    if number % 2 == 0:
        continue  # Skip even numbers
    print(f"Odd number: {number}")`,
      language: 'python',
      exercise: 'Create a number guessing game using while loop'
    },
    {
      id: 'guessing-game',
      title: 'Building a Guessing Game',
      content: `
        <h3>Interactive Game Project</h3>
        <p>Create a fun number guessing game with multiple difficulty levels.</p>
      `,
      code: `import random

def guessing_game():
    print("=== Number Guessing Game ===")
    print("Choose difficulty:")
    print("1. Easy (1-10, 5 attempts)")
    print("2. Medium (1-50, 7 attempts)")
    print("3. Hard (1-100, 5 attempts)")
    
    difficulty = input("Enter choice (1-3): ")
    
    if difficulty == '1':
        max_num, attempts = 10, 5
    elif difficulty == '2':
        max_num, attempts = 50, 7
    elif difficulty == '3':
        max_num, attempts = 100, 5
    else:
        print("Invalid choice! Using medium difficulty.")
        max_num, attempts = 50, 7
    
    secret_number = random.randint(1, max_num)
    attempts_used = 0
    
    print(f"\\nI'm thinking of a number between 1 and {max_num}")
    print(f"You have {attempts} attempts. Good luck!")
    
    while attempts_used < attempts:
        try:
            guess = int(input(f"\\nAttempt {attempts_used + 1}/{attempts}: Enter your guess: "))
            attempts_used += 1
            
            if guess == secret_number:
                print(f"🎉 Congratulations! You guessed it in {attempts_used} attempts!")
                break
            elif guess < secret_number:
                print("Too low! Try higher.")
            else:
                print("Too high! Try lower.")
                
            # Give hint after few attempts
            if attempts_used == attempts - 1:
                if secret_number % 2 == 0:
                    print("💡 Hint: The number is even!")
                else:
                    print("💡 Hint: The number is odd!")
                    
        except ValueError:
            print("Please enter a valid number!")
    
    if attempts_used == attempts and guess != secret_number:
        print(f"💔 Game over! The number was {secret_number}")

# Start the game
guessing_game()`,
      language: 'python',
      exercise: 'Add a score system that gives more points for fewer attempts'
    },
    {
      id: 'car-game',
      title: 'Building the Car Game',
      content: `
        <h3>Text-Based Car Adventure Game</h3>
        <p>Create an interactive car simulation game with various commands.</p>
      `,
      code: `def car_game():
    print("=== Car Adventure Game ===")
    print("Commands: start, stop, help, quit")
    
    car_started = False
    speed = 0
    
    while True:
        command = input("> ").lower().strip()
        
        if command == "help":
            print('''
Available commands:
- start: Start the car
- stop: Stop the car  
- accelerate: Increase speed
- brake: Decrease speed
- status: Check car status
- quit: Exit game
            ''')
        
        elif command == "start":
            if car_started:
                print("Car is already started!")
            else:
                car_started = True
                speed = 10
                print("Car started! Vroom vroom! 🚗")
        
        elif command == "stop":
            if not car_started:
                print("Car is already stopped!")
            else:
                car_started = False
                speed = 0
                print("Car stopped.")
        
        elif command == "accelerate":
            if car_started:
                speed += 10
                print(f"Accelerating... Speed: {speed} km/h")
            else:
                print("You need to start the car first!")
        
        elif command == "brake":
            if car_started:
                if speed > 0:
                    speed = max(0, speed - 10)
                    print(f"Braking... Speed: {speed} km/h")
                else:
                    print("Car is already stopped!")
            else:
                print("You need to start the car first!")
        
        elif command == "status":
            status = "started" if car_started else "stopped"
            print(f"Car is {status}. Speed: {speed} km/h")
        
        elif command == "quit":
            print("Thanks for playing! Goodbye! 👋")
            break
        
        else:
            print("I don't understand that command. Type 'help' for available commands.")

# Start the game
car_game()`,
      language: 'python',
      exercise: 'Add more features like fuel system, gear shifting, or GPS navigation'
    },
    {
      id: 'for-loops',
      title: 'For Loops',
      content: `
        <h3>Iterating with For Loops</h3>
        <p>Loop through sequences like lists, strings, and ranges.</p>
      `,
      code: `# Basic for loop with range
print("Counting 1 to 5:")
for i in range(1, 6):
    print(i)

# Looping through a list
fruits = ["apple", "banana", "orange", "grape"]
print("\\nMy favorite fruits:")
for fruit in fruits:
    print(f"I love {fruit}!")

# Looping through a string
word = "Python"
print("\\nLetters in Python:")
for letter in word:
    print(letter)

# Using range with step
print("\\nEven numbers 0 to 10:")
for i in range(0, 11, 2):
    print(i)

# Looping with index
print("\\nFruits with index:")
for index, fruit in enumerate(fruits):
    print(f"{index + 1}. {fruit}")

# Nested for loops
print("\\nMultiplication table:")
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i} x {j} = {i * j}")
    print("---")`,
      language: 'python',
      exercise: 'Create a program that prints a pyramid pattern using nested for loops'
    },
    {
      id: 'nested-loops',
      title: 'Nested Loops',
      content: `
        <h3>Advanced Looping with Nested Structures</h3>
        <p>Use loops within loops for complex patterns and data processing.</p>
      `,
      code: `# Pattern printing with nested loops
print("Rectangle pattern:")
rows = 4
cols = 6

for i in range(rows):
    for j in range(cols):
        print("*", end="")
    print()  # New line after each row

print("\\nRight triangle pattern:")
for i in range(1, 6):
    for j in range(i):
        print("*", end="")
    print()

# Multiplication table
print("\\nComplete multiplication table:")
for i in range(1, 6):
    for j in range(1, 11):
        result = i * j
        print(f"{i} x {j} = {result:2}", end="  ")
    print()

# Processing 2D data
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print("\\nMatrix elements:")
for row in matrix:
    for element in row:
        print(element, end=" ")
    print()

# Finding pairs
numbers = [1, 2, 3, 4]
print("\\nAll pairs:")
for i in range(len(numbers)):
    for j in range(i + 1, len(numbers)):
        print(f"({numbers[i]}, {numbers[j]})")`,
      language: 'python',
      exercise: 'Create a program that finds all prime numbers up to 100 using nested loops'
    },
    {
      id: 'lists-collections',
      title: 'Lists',
      content: `
        <h3>Working with Python Lists</h3>
        <p>Learn to create, manipulate, and process lists - Python's most versatile data structure.</p>
      `,
      code: `# Creating lists
numbers = [1, 2, 3, 4, 5]
fruits = ["apple", "banana", "orange"]
mixed = [1, "hello", 3.14, True]
empty_list = []

print("Original lists:")
print("Numbers:", numbers)
print("Fruits:", fruits)
print("Mixed:", mixed)

# Accessing elements
print("\\nAccessing elements:")
print("First fruit:", fruits[0])
print("Last number:", numbers[-1])
print("Slice 1-3:", numbers[1:4])

# Modifying lists
fruits[1] = "mango"
print("\\nAfter modification:", fruits)

# List methods
fruits.append("grape")
fruits.insert(1, "kiwi")
fruits.extend(["pineapple", "berry"])
print("\\nAfter adding elements:", fruits)

# Removing elements
removed = fruits.pop(2)
fruits.remove("apple")
print("After removal:", fruits)
print("Removed item:", removed)

# List operations
combined = numbers + fruits
repeated = numbers * 2
print("\\nCombined list:", combined)
print("Repeated list:", repeated)

# List comprehension
squares = [x**2 for x in range(1, 6)]
even_numbers = [x for x in range(10) if x % 2 == 0]
print("\\nSquares:", squares)
print("Even numbers:", even_numbers)`,
      language: 'python',
      exercise: 'Create a program that manages a shopping list with add, remove, and search functions'
    },
    {
      id: '2d-lists',
      title: '2D Lists',
      content: `
        <h3>Working with Multi-dimensional Lists</h3>
        <p>Create and manipulate lists within lists for matrix operations and grid-based data.</p>
      `,
      code: `# Creating 2D lists (matrices)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Accessing elements
print("2D Matrix:")
for row in matrix:
    print(row)

print("\\nElement at row 1, column 2:", matrix[1][2])

# Creating a 3x3 grid
grid = [[0 for _ in range(3)] for _ in range(3)]
print("\\nEmpty 3x3 grid:")
for row in grid:
    print(row)

# Tic-Tac-Toe board
tic_tac_toe = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
]

# Mark positions
tic_tac_toe[0][0] = "X"
tic_tac_toe[1][1] = "O"
tic_tac_toe[2][2] = "X"

print("\\nTic-Tac-Toe Board:")
for row in tic_tac_toe:
    print("|".join(row))
    print("-" * 5)

# Matrix operations
matrix_a = [[1, 2], [3, 4]]
matrix_b = [[5, 6], [7, 8]]

# Matrix addition
result = [[0, 0], [0, 0]]
for i in range(2):
    for j in range(2):
        result[i][j] = matrix_a[i][j] + matrix_b[i][j]

print("\\nMatrix Addition:")
print("Matrix A:", matrix_a)
print("Matrix B:", matrix_b)
print("Result:", result)

# Transpose a matrix
original = [[1, 2, 3], [4, 5, 6]]
transpose = [[original[j][i] for j in range(len(original))] for i in range(len(original[0]))]

print("\\nMatrix Transpose:")
print("Original:", original)
print("Transpose:", transpose)`,
      language: 'python',
      exercise: 'Create a program that multiplies two 2x2 matrices'
    },
    {
      id: 'list-methods',
      title: 'List Methods',
      content: `
        <h3>Comprehensive Guide to List Methods</h3>
        <p>Master all built-in methods available for list manipulation and processing.</p>
      `,
      code: `# Comprehensive list methods demonstration
numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5]

print("Original list:", numbers)

# Adding elements
numbers.append(7)  # Add to end
print("After append(7):", numbers)

numbers.insert(2, 8)  # Insert at index 2
print("After insert(2, 8):", numbers)

numbers.extend([0, 1])  # Add multiple elements
print("After extend([0, 1]):", numbers)

# Removing elements
removed = numbers.pop()  # Remove last element
print(f"After pop(): {numbers}, removed: {removed}")

removed_index = numbers.pop(3)  # Remove at index 3
print(f"After pop(3): {numbers}, removed: {removed_index}")

numbers.remove(1)  # Remove first occurrence of 1
print("After remove(1):", numbers)

# Searching and counting
index = numbers.index(5)  # Find index of first occurrence
print("Index of 5:", index)

count_5 = numbers.count(5)  # Count occurrences
print("Count of 5:", count_5)

# Sorting and reversing
numbers.sort()  # Sort ascending
print("After sort():", numbers)

numbers.sort(reverse=True)  # Sort descending
print("After sort(reverse=True):", numbers)

numbers.reverse()  # Reverse the list
print("After reverse():", numbers)

# Copying lists
numbers_copy = numbers.copy()  # Shallow copy
numbers_copy[0] = 100
print("Original after copy modification:", numbers)
print("Copy after modification:", numbers_copy)

# Clearing list
numbers.clear()
print("After clear():", numbers)

# Advanced methods
words = ["apple", "banana", "cherry", "date"]
words.sort(key=len)  # Sort by length
print("Words sorted by length:", words)

# List comprehension with conditions
even_squares = [x**2 for x in range(10) if x % 2 == 0]
print("Even squares:", even_squares)`,
      language: 'python',
      exercise: 'Create a program that sorts a list of names by length and then alphabetically'
    },
    {
      id: 'tuples',
      title: 'Tuples',
      content: `
        <h3>Immutable Sequences with Tuples</h3>
        <p>Learn about tuples - immutable sequences that are more efficient than lists for fixed data.</p>
      `,
      code: `# Creating tuples
empty_tuple = ()
single_item = (1,)  # Note the comma
multiple_items = (1, 2, 3, 4, 5)
mixed_tuple = (1, "hello", 3.14, True)

print("Tuples:")
print("Empty:", empty_tuple)
print("Single item:", single_item)
print("Multiple items:", multiple_items)
print("Mixed:", mixed_tuple)

# Tuple packing and unpacking
# Packing
person = ("Ravi", 25, "Engineer")
print("\\nPacked tuple:", person)

# Unpacking
name, age, profession = person
print(f"Unpacked: Name={name}, Age={age}, Profession={profession}")

# Extended unpacking
numbers = (1, 2, 3, 4, 5)
first, *middle, last = numbers
print(f"Extended unpacking: first={first}, middle={middle}, last={last}")

# Tuple operations
tuple1 = (1, 2, 3)
tuple2 = (4, 5, 6)

combined = tuple1 + tuple2
repeated = tuple1 * 3

print("\\nTuple operations:")
print("Combined:", combined)
print("Repeated:", repeated)

# Tuple methods
repeated_numbers = (1, 2, 3, 1, 2, 1)
count_1 = repeated_numbers.count(1)
index_3 = repeated_numbers.index(3)

print("\\nTuple methods:")
print("Count of 1:", count_1)
print("Index of 3:", index_3)

# Advantages of tuples
coordinates = [(1, 2), (3, 4), (5, 6)]  # List of tuples
print("\\nList of tuples (coordinates):", coordinates)

# Tuple vs List
# Tuples are faster and use less memory
import sys
list_size = sys.getsizeof([1, 2, 3, 4, 5])
tuple_size = sys.getsizeof((1, 2, 3, 4, 5))

print(f"\\nMemory usage - List: {list_size} bytes, Tuple: {tuple_size} bytes")`,
      language: 'python',
      exercise: 'Create a program that uses tuples to store student records and calculate average grades'
    },
    {
      id: 'unpacking',
      title: 'Unpacking',
      content: `
        <h3>Advanced Unpacking Techniques</h3>
        <p>Master Python's powerful unpacking features for clean and efficient code.</p>
      `,
      code: `# Basic unpacking
coordinates = (10, 20, 30)
x, y, z = coordinates
print(f"Coordinates: x={x}, y={y}, z={z}")

# Unpacking lists
colors = ["red", "green", "blue"]
r, g, b = colors
print(f"Colors: {r}, {g}, {b}")

# Extended unpacking with *
numbers = [1, 2, 3, 4, 5, 6]
first, *middle, last = numbers
print(f"First: {first}, Middle: {middle}, Last: {last}")

# Unpacking in for loops
points = [(1, 2), (3, 4), (5, 6)]
print("\\nPoints:")
for x, y in points:
    print(f"x={x}, y={y}")

# Dictionary unpacking
person = {"name": "Ravi", "age": 25, "city": "Mumbai"}
name, age, city = person.values()
print(f"\\nPerson: {name}, {age} years old, from {city}")

# Function arguments unpacking
def introduce(name, age, profession):
    return f"Hi, I'm {name}, {age} years old, working as {profession}"

person_data = ["Alice", 30, "Engineer"]
print("\\nFunction unpacking:", introduce(*person_data))

# Keyword arguments unpacking
person_dict = {"name": "Bob", "age": 25, "profession": "Designer"}
print("Keyword unpacking:", introduce(**person_dict))

# Nested unpacking
data = [("Ravi", 25), ("Alice", 30), ("Bob", 35)]
print("\\nNested unpacking:")
for (name, age) in data:
    print(f"{name} is {age} years old")

# Swapping variables
a, b = 10, 20
print(f"\\nBefore swap: a={a}, b={b}")
a, b = b, a  # Elegant swap
print(f"After swap: a={a}, b={b}")

# Multiple assignment
x = y = z = 0
print(f"\\nMultiple assignment: x={x}, y={y}, z={z}")

# Unpacking with ignore
data = (1, 2, 3, 4, 5)
first, second, *_ = data
print(f"\\nIgnoring rest: first={first}, second={second}")

first, *_, last = data
print(f"First and last: first={first}, last={last}")`,
      language: 'python',
      exercise: 'Create a function that accepts variable arguments and returns statistics about them'
    },
    {
      id: 'dictionaries',
      title: 'Dictionaries',
      content: `
        <h3>Key-Value Data Structures</h3>
        <p>Master dictionaries - Python's implementation of hash tables for efficient data storage and retrieval.</p>
      `,
      code: `# Creating dictionaries
empty_dict = {}
person = {"name": "Ravi", "age": 25, "city": "Mumbai"}
mixed_keys = {1: "one", "two": 2, 3.0: "three"}

print("Dictionaries:")
print("Empty:", empty_dict)
print("Person:", person)
print("Mixed keys:", mixed_keys)

# Accessing values
print("\\nAccessing values:")
print("Name:", person["name"])
print("Age:", person.get("age"))
print("Country:", person.get("country", "India"))  # Default value

# Modifying dictionaries
person["age"] = 26  # Update existing
person["profession"] = "Engineer"  # Add new key
person.update({"city": "Delhi", "hobby": "coding"})  # Multiple updates

print("\\nAfter modifications:", person)

# Dictionary methods
keys = person.keys()
values = person.values()
items = person.items()

print("\\nDictionary methods:")
print("Keys:", list(keys))
print("Values:", list(values))
print("Items:", list(items))

# Removing elements
removed_value = person.pop("hobby")
removed_item = person.popitem()  # Remove last inserted

print("\\nAfter removal:", person)
print("Removed value:", removed_value)
print("Removed item:", removed_item)

# Dictionary comprehension
squares = {x: x**2 for x in range(1, 6)}
even_squares = {x: x**2 for x in range(1, 11) if x % 2 == 0}

print("\\nDictionary comprehensions:")
print("Squares:", squares)
print("Even squares:", even_squares)

# Nested dictionaries
students = {
    "Ravi": {"age": 25, "grades": [85, 90, 78]},
    "Alice": {"age": 22, "grades": [92, 88, 95]},
    "Bob": {"age": 24, "grades": [76, 85, 80]}
}

print("\\nNested dictionaries:")
for name, info in students.items():
    avg_grade = sum(info["grades"]) / len(info["grades"])
    print(f"{name}: {info['age']} years, Average grade: {avg_grade:.1f}")

# Dictionary merging (Python 3.9+)
dict1 = {"a": 1, "b": 2}
dict2 = {"b": 3, "c": 4}
merged = dict1 | dict2  # Union operator
print("\\nMerged dictionaries:", merged)`,
      language: 'python',
      exercise: 'Create a phone book application using dictionaries with add, search, and delete functions'
    },
    {
      id: 'emoji-converter',
      title: 'Emoji Converter Program',
      content: `
        <h3>Fun Project: Text to Emoji Converter</h3>
        <p>Build an application that converts words to emojis using dictionary mapping.</p>
      `,
      code: `def emoji_converter():
    # Emoji mapping dictionary
    emoji_map = {
        "happy": "😊",
        "sad": "😢",
        "angry": "😠",
        "love": "❤️",
        "laugh": "😂",
        "cool": "😎",
        "fire": "🔥",
        "star": "⭐",
        "heart": "💖",
        "thumbsup": "👍",
        "party": "🎉",
        "music": "🎵",
        "food": "🍕",
        "coffee": "☕",
        "book": "📚",
        "computer": "💻",
        "phone": "📱",
        "car": "🚗",
        "plane": "✈️",
        "sun": "☀️"
    }
    
    print("=== Emoji Converter ===")
    print("Convert words to emojis!")
    print("Type 'quit' to exit")
    print("Type 'list' to see available words")
    print("-" * 30)
    
    while True:
        text = input("\\nEnter text or word: ").lower().strip()
        
        if text == "quit":
            print("Thanks for using Emoji Converter! 👋")
            break
        elif text == "list":
            print("Available words:", ", ".join(emoji_map.keys()))
            continue
        
        # Convert words in the text
        words = text.split()
        converted = []
        
        for word in words:
            # Remove punctuation for better matching
            clean_word = word.strip(".,!?;:")
            if clean_word in emoji_map:
                converted.append(emoji_map[clean_word])
            else:
                converted.append(word)
        
        result = " ".join(converted)
        print(f"Converted: {result}")
        
        # Show learning suggestion
        unknown_words = [word.strip(".,!?;:") for word in words 
                        if word.strip(".,!?;:") not in emoji_map and word != "list"]
        if unknown_words:
            print(f"💡 Tip: I don't know these words: {', '.join(unknown_words)}")
            print("Try one of the available words from the list!")

# Enhanced version with learning capability
def smart_emoji_converter():
    emoji_map = {
        "happy": "😊", "sad": "😢", "angry": "😠", "love": "❤️",
        "laugh": "😂", "cool": "😎", "fire": "🔥", "star": "⭐"
    }
    
    print("=== Smart Emoji Converter ===")
    
    while True:
        text = input("\\nEnter text (or 'quit'): ").lower()
        if text == "quit":
            break
        
        # Learn new emojis
        if "=" in text:
            try:
                word, emoji = text.split("=")
                word = word.strip()
                emoji_map[word] = emoji.strip()
                print(f"Learned: {word} = {emoji}")
                continue
            except:
                print("Invalid format. Use: word = emoji")
                continue
        
        # Convert text
        converted = []
        for word in text.split():
            clean_word = word.strip(".,!?;:")
            converted.append(emoji_map.get(clean_word, word))
        
        print("Result:", " ".join(converted))

# Run the converter
emoji_converter()`,
      language: 'python',
      exercise: 'Add a feature to save and load custom emoji mappings from a file'
    },
    {
      id: 'functions-basics',
      title: 'Functions',
      content: `
        <h3>Organizing Code with Functions</h3>
        <p>Learn to create reusable code blocks with functions for better program structure.</p>
      `,
      code: `# Basic function definition
def greet():
    print("Hello, World!")

# Function with parameters
def greet_person(name):
    print(f"Hello, {name}!")

# Function with return value
def add_numbers(a, b):
    return a + b

# Function with default parameters
def introduce(name, age=25, city="Unknown"):
    return f"Hi, I'm {name}, {age} years old, from {city}"

# Function with multiple return values
def calculate_stats(numbers):
    total = sum(numbers)
    average = total / len(numbers)
    maximum = max(numbers)
    return total, average, maximum

# Using the functions
print("Basic function:")
greet()

print("\\nFunction with parameters:")
greet_person("Ravi")
greet_person("Alice")

print("\\nFunction with return value:")
result = add_numbers(5, 3)
print(f"5 + 3 = {result}")

print("\\nFunction with default parameters:")
print(introduce("Bob"))
print(introduce("Charlie", 30))
print(introduce("Diana", 28, "London"))

print("\\nFunction with multiple returns:")
numbers = [10, 20, 30, 40, 50]
total, avg, max_val = calculate_stats(numbers)
print(f"Numbers: {numbers}")
print(f"Total: {total}, Average: {avg:.1f}, Maximum: {max_val}")

# Function documentation
def power(base, exponent):
    """
    Calculate the power of a number.
    
    Args:
        base (float): The base number
        exponent (float): The exponent
    
    Returns:
        float: base raised to the power of exponent
    """
    return base ** exponent

print("\\nFunction documentation:")
print(power.__doc__)
print(f"2^3 = {power(2, 3)}")`,
      language: 'python',
      exercise: 'Create a function that converts temperature between Celsius and Fahrenheit'
    },
    {
      id: 'parameters',
      title: 'Function Parameters',
      content: `
        <h3>Advanced Parameter Techniques</h3>
        <p>Master different ways to pass arguments to functions including *args and **kwargs.</p>
      `,
      code: `# Positional arguments
def describe_pet(animal_type, pet_name):
    print(f"I have a {animal_type} named {pet_name}.")

# Keyword arguments
def describe_person(name, age, city):
    print(f"{name} is {age} years old and lives in {city}.")

# Default parameters
def make_pizza(size="medium", *toppings):
    print(f"Making a {size} pizza with toppings:")
    for topping in toppings:
        print(f"- {topping}")

# *args for variable positional arguments
def sum_numbers(*args):
    total = 0
    for number in args:
        total += number
    return total

# **kwargs for variable keyword arguments
def create_profile(**kwargs):
    profile = {}
    for key, value in kwargs.items():
        profile[key] = value
        print(f"{key}: {value}")
    return profile

# Using the functions
print("Positional arguments:")
describe_pet("dog", "Buddy")
describe_pet("cat", "Whiskers")

print("\\nKeyword arguments:")
describe_person(name="Alice", age=25, city="Paris")
describe_person(city="Tokyo", age=30, name="Bob")  # Order doesn't matter

print("\\nDefault parameters:")
make_pizza()
make_pizza("large")
make_pizza("small", "cheese", "pepperoni", "mushrooms")

print("\\n*args example:")
print("Sum of 1, 2, 3:", sum_numbers(1, 2, 3))
print("Sum of 1 to 5:", sum_numbers(1, 2, 3, 4, 5))

print("\\n**kwargs example:")
profile = create_profile(name="Ravi", age=25, profession="Engineer", city="Mumbai")

# Combined usage
def flexible_function(required, *args, **kwargs):
    print(f"Required: {required}")
    print(f"Additional args: {args}")
    print(f"Keyword args: {kwargs}")

print("\\nCombined parameters:")
flexible_function("hello", 1, 2, 3, name="Ravi", age=25)

# Type hints (Python 3.5+)
def calculate_area(length: float, width: float) -> float:
    """Calculate area of a rectangle."""
    return length * width

print("\\nType hints:")
area = calculate_area(5.5, 3.2)
print(f"Area: {area}")`,
      language: 'python',
      exercise: 'Create a function that accepts any number of numbers and returns their statistics'
    },
    {
      id: 'return-statements',
      title: 'Return Statements',
      content: `
        <h3>Mastering Function Return Values</h3>
        <p>Learn different ways to return data from functions and handle multiple return values.</p>
      `,
      code: `# Simple return
def square(number):
    return number * number

# Multiple return values
def min_max(numbers):
    return min(numbers), max(numbers)

# Returning different types
def process_data(data):
    if not data:
        return None  # Return None for empty data
    elif len(data) == 1:
        return data[0]  # Return single element
    else:
        return data  # Return the whole list

# Early return
def is_even(number):
    if number % 2 == 0:
        return True
    return False  # This line only executes if number is odd

# Returning collections
def get_student_info():
    name = "Ravi"
    grades = [85, 92, 78]
    return {"name": name, "grades": grades, "average": sum(grades)/len(grades)}

# Returning functions (closures)
def multiplier(factor):
    def multiply(number):
        return number * factor
    return multiply

# Using the functions
print("Simple return:")
result = square(5)
print(f"Square of 5: {result}")

print("\\nMultiple return values:")
numbers = [10, 5, 20, 15, 30]
min_val, max_val = min_max(numbers)
print(f"Numbers: {numbers}")
print(f"Min: {min_val}, Max: {max_val}")

print("\\nReturning different types:")
print("Empty list:", process_data([]))
print("Single item:", process_data([42]))
print("Multiple items:", process_data([1, 2, 3]))

print("\\nEarly return:")
print(f"Is 10 even? {is_even(10)}")
print(f"Is 7 even? {is_even(7)}")

print("\\nReturning dictionary:")
student = get_student_info()
print(f"Student: {student}")

print("\\nReturning functions:")
double = multiplier(2)
triple = multiplier(3)
print(f"Double 5: {double(5)}")
print(f"Triple 5: {triple(5)}")

# Return with conditional expressions
def get_grade(score):
    return "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "F"

print("\\nConditional return:")
print(f"Score 85: {get_grade(85)}")
print(f"Score 92: {get_grade(92)}")
print(f"Score 65: {get_grade(65)}")`,
      language: 'python',
      exercise: 'Create a function that returns a dictionary containing various statistics about a list of numbers'
    },
    {
      id: 'exceptions',
      title: 'Exceptions',
      content: `
        <h3>Error Handling with Exceptions</h3>
        <p>Learn to handle errors gracefully using try-except blocks for robust programs.</p>
      `,
      code: `# Basic exception handling
def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        return "Error: Cannot divide by zero!"
    except TypeError:
        return "Error: Please provide numbers!"
    else:
        return f"Result: {result}"
    finally:
        print("Division operation completed.")

# Multiple exceptions
def get_list_element(lst, index):
    try:
        return lst[index]
    except (IndexError, TypeError) as e:
        return f"Error: {e}"

# Raising exceptions
def calculate_age(birth_year):
    current_year = 2025
    if birth_year > current_year:
        raise ValueError("Birth year cannot be in the future!")
    return current_year - birth_year

# Custom exceptions
class NegativeNumberError(Exception):
    def __init__(self, number):
        self.number = number
        super().__init__(f"Negative numbers not allowed: {number}")

def square_root(number):
    if number < 0:
        raise NegativeNumberError(number)
    return number ** 0.5

# Using the functions
print("Basic exception handling:")
print(safe_divide(10, 2))
print(safe_divide(10, 0))
print(safe_divide(10, "2"))

print("\\nMultiple exceptions:")
numbers = [1, 2, 3]
print(get_list_element(numbers, 1))
print(get_list_element(numbers, 5))  # IndexError
print(get_list_element("not a list", 1))  # TypeError

print("\\nRaising exceptions:")
try:
    age = calculate_age(1995)
    print(f"Age: {age}")
    age_future = calculate_age(2030)  # This will raise ValueError
except ValueError as e:
    print(f"Caught exception: {e}")

print("\\nCustom exceptions:")
try:
    print(f"Square root of 16: {square_root(16)}")
    print(f"Square root of -4: {square_root(-4)}")  # This will raise custom exception
except NegativeNumberError as e:
    print(f"Caught custom exception: {e}")

# Exception hierarchy
def demonstrate_exceptions():
    exceptions = [
        ZeroDivisionError,
        IndexError,
        KeyError,
        TypeError,
        ValueError,
        FileNotFoundError
    ]
    
    print("\\nCommon exceptions:")
    for exception in exceptions:
        print(f"- {exception.__name__}")

demonstrate_exceptions()`,
      language: 'python',
      exercise: 'Create a robust calculator that handles all possible user input errors'
    },
    {
      id: 'classes',
      title: 'Classes and OOP',
      content: `
        <h3>Object-Oriented Programming with Classes</h3>
        <p>Learn to create classes and objects to model real-world entities and relationships.</p>
      `,
      code: `# Basic class definition
class Dog:
    # Class attribute
    species = "Canis familiaris"
    
    # Initializer (constructor)
    def __init__(self, name, age, breed):
        # Instance attributes
        self.name = name
        self.age = age
        self.breed = breed
    
    # Instance method
    def bark(self):
        return f"{self.name} says Woof!"
    
    def describe(self):
        return f"{self.name} is a {self.age}-year-old {self.breed}"

# Inheritance
class GermanShepherd(Dog):
    def __init__(self, name, age, color="black and tan"):
        super().__init__(name, age, "German Shepherd")
        self.color = color
    
    # Method overriding
    def bark(self):
        return f"{self.name} says a loud WOOF!"
    
    # Additional method
    def guard(self):
        return f"{self.name} is guarding the house!"

# Using the classes
print("Basic class usage:")
dog1 = Dog("Buddy", 3, "Golden Retriever")
dog2 = Dog("Max", 5, "Labrador")

print(dog1.describe())
print(dog1.bark())
print(dog2.describe())
print(f"Species: {Dog.species}")

print("\\nInheritance:")
gs_dog = GermanShepherd("Rex", 4, "sable")
print(gs_dog.describe())
print(gs_dog.bark())  # Overridden method
print(gs_dog.guard())  # Additional method

# Property decorators
class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def radius(self):
        return self._radius
    
    @radius.setter
    def radius(self, value):
        if value > 0:
            self._radius = value
        else:
            raise ValueError("Radius must be positive")
    
    @property
    def area(self):
        return 3.14159 * self._radius ** 2
    
    @property
    def circumference(self):
        return 2 * 3.14159 * self._radius

print("\\nProperty decorators:")
circle = Circle(5)
print(f"Radius: {circle.radius}")
print(f"Area: {circle.area:.2f}")
print(f"Circumference: {circle.circumference:.2f}")

circle.radius = 7
print(f"New area: {circle.area:.2f}")

# Class methods and static methods
class TemperatureConverter:
    @staticmethod
    def celsius_to_fahrenheit(celsius):
        return (celsius * 9/5) + 32
    
    @staticmethod
    def fahrenheit_to_celsius(fahrenheit):
        return (fahrenheit - 32) * 5/9
    
    @classmethod
    def get_conversion_methods(cls):
        return [method for method in dir(cls) if not method.startswith('_')]

print("\\nStatic and class methods:")
print(f"25°C = {TemperatureConverter.celsius_to_fahrenheit(25):.1f}°F")
print(f"77°F = {TemperatureConverter.fahrenheit_to_celsius(77):.1f}°C")
print(f"Conversion methods: {TemperatureConverter.get_conversion_methods()}")`,
      language: 'python',
      exercise: 'Create a BankAccount class with deposit, withdraw, and transfer methods'
    },
    {
      id: 'modules',
      title: 'Modules',
      content: `
        <h3>Organizing Code with Modules</h3>
        <p>Learn to create and use modules to organize your code into logical units.</p>
      `,
      code: `# Creating and using modules
# This demonstrates how modules work (you'd typically have separate files)

# Importing entire module
import math
import random
import datetime

# Importing specific functions
from math import sqrt, pow, pi
from random import randint, choice

# Importing with aliases
import numpy as np
import pandas as pd

# Creating our own module (conceptual)
# File: calculator.py
"""
calculator.py - A simple calculator module
"""

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# Using the modules
print("Math module:")
print(f"Square root of 16: {math.sqrt(16)}")
print(f"2^3: {math.pow(2, 3)}")
print(f"Pi: {math.pi}")

print("\\nRandom module:")
print(f"Random integer: {random.randint(1, 100)}")
print(f"Random choice: {random.choice(['apple', 'banana', 'orange'])}")

print("\\nDatetime module:")
now = datetime.datetime.now()
print(f"Current datetime: {now}")
print(f"Formatted: {now.strftime('%Y-%m-%d %H:%M:%S')}")

print("\\nUsing our calculator module (conceptual):")
# In practice, you'd import from calculator.py
result_add = add(10, 5)  # Assuming imported
result_multiply = multiply(4, 7)  # Assuming imported
print(f"10 + 5 = {result_add}")
print(f"4 × 7 = {result_multiply}")

# Exploring module contents
print("\\nMath module functions:")
math_functions = [func for func in dir(math) if not func.startswith('_')]
print(f"Number of functions: {len(math_functions)}")
print("Sample functions:", math_functions[:10])

# Package structure example
"""
my_package/
    __init__.py
    calculator.py
    converter.py
    utils/
        __init__.py
        helpers.py
"""

# Using __name__ == "__main__"
def main():
    print("This runs when the script is executed directly")

if __name__ == "__main__":
    main()
    print("\\nScript is being run directly")
else:
    print("Script is being imported as a module")`,
      language: 'python',
      exercise: 'Create your own module with utility functions and import it in another script'
    },
    {
      id: 'packages',
      title: 'Packages',
      content: `
        <h3>Organizing Projects with Packages</h3>
        <p>Learn to create packages to organize large projects and manage dependencies.</p>
      `,
      code: `# Package structure demonstration
# This shows how to create and use packages

# Creating a package structure:
"""
my_project/
    main.py
    utils/
        __init__.py
        calculator.py
        converter.py
        helpers.py
    models/
        __init__.py
        user.py
        product.py
    tests/
        __init__.py
        test_calculator.py
        test_converter.py
"""

# utils/__init__.py
"""
Utils package initialization
"""

from .calculator import add, subtract, multiply, divide
from .converter import temperature_converter, weight_converter
from .helpers import format_output, validate_input

# utils/calculator.py
def add(a, b):
    """Add two numbers"""
    return a + b

def subtract(a, b):
    """Subtract b from a"""
    return a - b

def multiply(a, b):
    """Multiply two numbers"""
    return a * b

def divide(a, b):
    """Divide a by b"""
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# utils/converter.py
def temperature_converter(value, from_unit, to_unit):
    """Convert temperature between units"""
    conversions = {
        ('celsius', 'fahrenheit'): lambda x: (x * 9/5) + 32,
        ('fahrenheit', 'celsius'): lambda x: (x - 32) * 5/9,
        ('celsius', 'kelvin'): lambda x: x + 273.15,
        ('kelvin', 'celsius'): lambda x: x - 273.15
    }
    
    key = (from_unit.lower(), to_unit.lower())
    if key in conversions:
        return conversions[key](value)
    else:
        raise ValueError(f"Unsupported conversion: {from_unit} to {to_unit}")

def weight_converter(value, from_unit, to_unit):
    """Convert weight between units"""
    # Implementation similar to temperature_converter
    pass

# Using the package
print("Using our package (conceptual):")

# In main.py you would import like this:
# from utils.calculator import add, multiply
# from utils.converter import temperature_converter

result_add = add(15, 25)  # Assuming imported
result_temp = temperature_converter(25, 'celsius', 'fahrenheit')  # Assuming imported

print(f"15 + 25 = {result_add}")
print(f"25°C = {result_temp:.1f}°F")

# Installing external packages
# pip install requests numpy pandas matplotlib

# Using external packages
import requests
import numpy as np

print("\\nUsing external packages:")
# Example with requests (if installed)
try:
    # This is just an example - wouldn't actually run without requests installed
    print("Requests package available for HTTP operations")
except ImportError:
    print("Requests package not installed")

# Example with numpy (if installed)
try:
    array = np.array([1, 2, 3, 4, 5])
    print(f"Numpy array: {array}")
    print(f"Mean: {np.mean(array)}")
except ImportError:
    print("Numpy package not installed")

# Package management best practices
"""
requirements.txt example:
requests==2.28.1
numpy>=1.21.0
pandas>=1.3.0
"""

# Virtual environments
print("""
Best practices:
1. Use virtual environments for isolation
2. Maintain requirements.txt file
3. Use semantic versioning
4. Write comprehensive documentation
5. Include tests in your package
""")`,
      language: 'python',
      exercise: 'Create a complete package with multiple modules and use it in a main program'
    },
    {
      id: 'generating-values',
      title: 'Generating Values',
      content: `
        <h3>Efficient Data Generation</h3>
        <p>Learn various techniques to generate sequences and data efficiently in Python.</p>
      `,
      code: `# Using range() for number sequences
print("Range examples:")
print("range(5):", list(range(5)))
print("range(1, 6):", list(range(1, 6)))
print("range(0, 10, 2):", list(range(0, 10, 2)))

# List comprehensions
print("\\nList comprehensions:")
squares = [x**2 for x in range(1, 6)]
print("Squares:", squares)

even_squares = [x**2 for x in range(1, 11) if x % 2 == 0]
print("Even squares:", even_squares)

# Generator expressions (memory efficient)
print("\\nGenerator expressions:")
squares_gen = (x**2 for x in range(1, 6))
print("Generator:", squares_gen)
print("Converted to list:", list(squares_gen))

# Using yield for custom generators
def fibonacci_generator(limit):
    a, b = 0, 1
    count = 0
    while count < limit:
        yield a
        a, b = b, a + b
        count += 1

print("\\nFibonacci generator:")
fib_gen = fibonacci_generator(10)
print("First 10 Fibonacci numbers:", list(fib_gen))

# Using itertools
import itertools

print("\\nItertools examples:")
# Infinite iterators
counter = itertools.count(start=10, step=2)
print("First 5 from counter:", [next(counter) for _ in range(5)])

# Combinations and permutations
letters = ['A', 'B', 'C']
print("Combinations of 2:", list(itertools.combinations(letters, 2)))
print("Permutations of 2:", list(itertools.permutations(letters, 2)))

# Random data generation
import random
import string

print("\\nRandom data generation:")
random_numbers = [random.randint(1, 100) for _ in range(5)]
print("Random numbers:", random_numbers)

random_string = ''.join(random.choices(string.ascii_letters, k=8))
print("Random string:", random_string)

# Numpy for numerical data (if available)
try:
    import numpy as np
    uniform_data = np.random.uniform(0, 1, 5)
    normal_data = np.random.normal(0, 1, 5)
    print("\\nNumpy random data:")
    print("Uniform:", uniform_data)
    print("Normal:", normal_data)
except ImportError:
    print("\\nNumpy not available for advanced random generation")

# Date ranges
from datetime import datetime, timedelta

print("\\nDate generation:")
start_date = datetime(2025, 1, 1)
date_range = [start_date + timedelta(days=x) for x in range(5)]
print("Date range:", [d.strftime('%Y-%m-%d') for d in date_range])

# Dictionary comprehensions
print("\\nDictionary comprehensions:")
square_dict = {x: x**2 for x in range(1, 6)}
print("Number squares:", square_dict)

word_lengths = {word: len(word) for word in ['apple', 'banana', 'cherry']}
print("Word lengths:", word_lengths)`,
      language: 'python',
      exercise: 'Create a generator that produces prime numbers up to a given limit'
    },
     {
          id: 'final-project',
          title: 'Final Project: Student Management System',
          content: `
            <h3>Complete Python Project</h3>
            <p>Let\'s build a student management system using everything we\'ve learned.</p>
          `,
          code: 'class Student:\n    def __init__(self, name, age, grade):\n        self.name = name\n        self.age = age\n        self.grade = grade\n    \n    def display_info(self):\n        print(f"Name: {self.name}, Age: {self.age}, Grade: {self.grade}")\n\nclass StudentManager:\n    def __init__(self):\n        self.students = []\n    \n    def add_student(self, name, age, grade):\n        student = Student(name, age, grade)\n        self.students.append(student)\n        print(f"Added student: {name}")\n    \n    def display_all_students(self):\n        print("\\n--- All Students ---")\n        for student in self.students:\n            student.display_info()\n    \n    def find_student(self, name):\n        for student in self.students:\n            if student.name.lower() == name.lower():\n                return student\n        return None\n\n# Main program\nmanager = StudentManager()\n\nwhile True:\n    print("\\n1. Add Student")\n    print("2. View All Students")\n    print("3. Find Student")\n    print("4. Exit")\n    \n    choice = input("Enter your choice (1-4): ")\n    \n    if choice == "1":\n        name = input("Enter student name: ")\n        age = int(input("Enter student age: "))\n        grade = input("Enter student grade: ")\n        manager.add_student(name, age, grade)\n    \n    elif choice == "2":\n        manager.display_all_students()\n    \n    elif choice == "3":\n        name = input("Enter student name to find: ")\n        student = manager.find_student(name)\n        if student:\n            student.display_info()\n        else:\n            print("Student not found!")\n    \n    elif choice == "4":\n        print("Goodbye!")\n        break\n    \n    else:\n        print("Invalid choice!")',
          language: 'python',
          exercise: 'Add more features like removing students or calculating average grade.'
        }
        // Add more topics here for the remaining concepts...
      ]
    },
    'java-programming': {
  title: 'java-programming',
  description: 'Master Java from basics to advanced concepts with practical projects',
  totalTopics: 65,
  topics: [
    {
      id: 'introduction',
      title: 'Introduction to Java',
      content: `
        <h3>Welcome to Java Programming!</h3>
        <p>Java is a powerful, object-oriented programming language used for building enterprise-scale applications.</p>
        
        <h4>What You'll Learn:</h4>
        <ul>
          <li>Java syntax and fundamental concepts</li>
          <li>Object-Oriented Programming principles</li>
          <li>Data structures and algorithms</li>
          <li>Exception handling and multithreading</li>
          <li>Real-world projects and applications</li>
        </ul>
        
        <h4>Why Learn Java?</h4>
        <ul>
          <li>Platform independence (Write Once, Run Anywhere)</li>
          <li>Strong community support</li>
          <li>High demand in job market</li>
          <li>Excellent for backend development</li>
        </ul>
      `,
      code: `// Your first Java program
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Welcome to Java Programming!");
        System.out.println("Let's start our journey to become Java experts!");
    }
}`,
      language: 'java',
      exercise: 'Write a program that prints a welcome message with your name.'
    },
    {
      id: 'installing-java',
      title: 'Installing Java and Setting Up Environment',
      content: `
        <h3>Setting Up Java Development Environment</h3>
        <p>Learn how to install Java and set up your development environment properly.</p>
        
        <h4>Installation Steps:</h4>
        <ol>
          <li>Download JDK from Oracle website</li>
          <li>Install JDK on your system</li>
          <li>Set up JAVA_HOME environment variable</li>
          <li>Configure PATH variable</li>
          <li>Verify installation</li>
          <li>Choose an IDE (Eclipse, IntelliJ, or VS Code)</li>
        </ol>
        
        <h4>Tools You'll Need:</h4>
        <ul>
          <li>JDK (Java Development Kit)</li>
          <li>IDE (Integrated Development Environment)</li>
          <li>Build tools (Maven/Gradle)</li>
        </ul>
      `,
      code: `// Verify Java installation
public class JavaCheck {
    public static void main(String[] args) {
        System.out.println("Java Version: " + System.getProperty("java.version"));
        System.out.println("JAVA_HOME: " + System.getProperty("java.home"));
        System.out.println("Working Directory: " + System.getProperty("user.dir"));
    }
}`,
      language: 'java',
      exercise: 'Install Java and run this verification program to confirm your setup.'
    },
    {
      id: 'anatomy-java-program',
      title: 'Anatomy of a Java Program',
      content: `
        <h3>Understanding Java Program Structure</h3>
        <p>Learn the essential components that make up a Java program.</p>
        
        <h4>Key Components:</h4>
        <ul>
          <li><strong>Class Declaration:</strong> Blueprint for objects</li>
          <li><strong>Main Method:</strong> Program entry point</li>
          <li><strong>Variables:</strong> Data storage</li>
          <li><strong>Methods:</strong> Reusable code blocks</li>
          <li><strong>Packages:</strong> Namespace organization</li>
          <li><strong>Comments:</strong> Code documentation</li>
        </ul>
        
        <h4>Naming Conventions:</h4>
        <ul>
          <li>Class names: PascalCase (MyClass)</li>
          <li>Method names: camelCase (myMethod)</li>
          <li>Variables: camelCase (myVariable)</li>
          <li>Constants: UPPER_CASE (MAX_VALUE)</li>
        </ul>
      `,
      code: `/*
 * This is a multi-line comment
 * Demonstrating Java program structure
 */
package com.example.basics; // Package declaration

import java.util.Date; // Import statement

/**
 * Javadoc comment for class documentation
 * This class demonstrates Java program anatomy
 */
public class ProgramAnatomy {
    
    // Class variable (static)
    private static final String PROGRAM_NAME = "Java Anatomy Demo";
    
    // Instance variable
    private int instanceCount;
    
    // Main method - program entry point
    public static void main(String[] args) {
        // Local variable
        String message = "Hello, Java!";
        
        // Create object instance
        ProgramAnatomy demo = new ProgramAnatomy();
        
        // Call method
        demo.displayMessage(message);
        
        // Static method call
        displayProgramInfo();
    }
    
    // Instance method
    public void displayMessage(String msg) {
        System.out.println("Message: " + msg);
        instanceCount++;
        System.out.println("Method called " + instanceCount + " times");
    }
    
    // Static method
    public static void displayProgramInfo() {
        System.out.println("Program: " + PROGRAM_NAME);
        System.out.println("Date: " + new Date());
    }
}`,
      language: 'java',
      exercise: 'Create a Java program with a class, main method, variables, and at least two methods.'
    },
    {
      id: 'first-java-program',
      title: 'Your First Java Program',
      content: `
        <h3>Writing and Running Your First Program</h3>
        <p>Learn to create, compile, and execute Java programs.</p>
        
        <h4>Compilation and Execution Process:</h4>
        <ol>
          <li>Write code in .java file</li>
          <li>Compile with javac command</li>
          <li>Run with java command</li>
          <li>JVM executes bytecode</li>
        </ol>
      `,
      code: `public class FirstProgram {
    public static void main(String[] args) {
        // Print statements
        System.out.println("=== My First Java Program ===");
        System.out.println("Hello, World!");
        System.out.println("This is exciting!");
        
        // Simple calculations
        int a = 10;
        int b = 20;
        int sum = a + b;
        
        System.out.println("Sum of " + a + " and " + b + " is: " + sum);
        
        // Current timestamp
        System.out.println("Program executed at: " + java.time.LocalDateTime.now());
    }
}`,
      language: 'java',
      exercise: 'Create a program that calculates and displays the area of a circle with radius 7.'
    },
    {
      id: 'cheat-sheet',
      title: 'Java Quick Reference Cheat Sheet',
      content: `
        <h3>Essential Java Syntax Reference</h3>
        <p>Quick reference guide for common Java syntax and operations.</p>
      `,
      code: `import java.util.*; // Common imports

public class CheatSheet {
    public static void main(String[] args) {
        // VARIABLE DECLARATIONS
        int number = 10;                    // Primitive
        String text = "Hello";              // Object
        final double PI = 3.14159;          // Constant
        
        // ARRAY DECLARATIONS
        int[] numbers = {1, 2, 3, 4, 5};    // Array literal
        String[] names = new String[3];     // Empty array
        
        // LIST DECLARATIONS
        List<String> list = new ArrayList<>();
        list.add("Java"); list.add("Python");
        
        // MAP DECLARATIONS
        Map<String, Integer> map = new HashMap<>();
        map.put("Alice", 25); map.put("Bob", 30);
        
        // CONTROL FLOW EXAMPLES
        // If-else
        if (number > 0) {
            System.out.println("Positive");
        } else if (number < 0) {
            System.out.println("Negative");
        } else {
            System.out.println("Zero");
        }
        
        // Switch statement (Java 14+)
        String day = "MONDAY";
        switch (day) {
            case "MONDAY" -> System.out.println("Start of week");
            case "FRIDAY" -> System.out.println("Weekend coming!");
            default -> System.out.println("Midweek");
        }
        
        // LOOPS
        // For loop
        for (int i = 0; i < 5; i++) {
            System.out.println("Iteration: " + i);
        }
        
        // Enhanced for loop
        for (String name : list) {
            System.out.println("Name: " + name);
        }
        
        // While loop
        int count = 0;
        while (count < 3) {
            System.out.println("Count: " + count);
            count++;
        }
        
        // METHOD CALLS
        int result = addNumbers(5, 3);
        System.out.println("5 + 3 = " + result);
    }
    
    // METHOD DEFINITION
    public static int addNumbers(int a, int b) {
        return a + b;
    }
}`,
      language: 'java',
      exercise: 'Create a cheat sheet with examples of different data types and control structures.'
    },
    {
      id: 'java-code-execution',
      title: 'How Java Code Gets Executed',
      content: `
        <h3>Java Compilation and Execution Process</h3>
        <p>Understand the journey from Java source code to executed program.</p>
        
        <h4>Execution Steps:</h4>
        <ol>
          <li><strong>Writing:</strong> Create .java source files</li>
          <li><strong>Compilation:</strong> javac compiles to .class bytecode</li>
          <li><strong>Loading:</strong> ClassLoader loads bytecode into JVM</li>
          <li><strong>Verification:</strong> Bytecode verifier checks safety</li>
          <li><strong>Execution:</strong> JIT compiler converts to machine code</li>
          <li><strong>Runtime:</strong> JVM manages memory and execution</li>
        </ol>
        
        <h4>JVM Architecture:</h4>
        <ul>
          <li>ClassLoader Subsystem</li>
          <li>Runtime Data Areas (Heap, Stack, Method Area)</li>
          <li>Execution Engine</li>
          <li>Native Method Interface</li>
        </ul>
      `,
      code: `public class ExecutionDemo {
    // Class variable - stored in Method Area
    private static String className = "ExecutionDemo";
    
    // Instance variable - stored in Heap
    private int instanceId;
    
    public ExecutionDemo(int id) {
        this.instanceId = id;
    }
    
    public void demonstrate() {
        // Local variables - stored in Stack
        int localVar = 100;
        String message = "Method execution";
        
        System.out.println("Class: " + className);
        System.out.println("Instance ID: " + instanceId);
        System.out.println("Local variable: " + localVar);
        System.out.println("Message: " + message);
        
        // Method call - new stack frame created
        calculateSquare(localVar);
    }
    
    private void calculateSquare(int number) {
        // Another stack frame
        int result = number * number;
        System.out.println("Square of " + number + " is: " + result);
    }
    
    public static void main(String[] args) {
        System.out.println("=== Java Execution Process ===");
        
        // Object creation - allocated in Heap
        ExecutionDemo demo1 = new ExecutionDemo(1);
        ExecutionDemo demo2 = new ExecutionDemo(2);
        
        // Method execution - uses Stack
        demo1.demonstrate();
        demo2.demonstrate();
        
        // Garbage Collection demo
        demo1 = null; // Eligible for GC
        System.gc(); // Suggest GC (not guaranteed)
        
        System.out.println("Execution completed!");
    }
    
    // Finalizer method (deprecated but for demonstration)
    @Override
    protected void finalize() throws Throwable {
        System.out.println("Object with ID " + instanceId + " is being garbage collected");
        super.finalize();
    }
}`,
      language: 'java',
      exercise: 'Create a program that demonstrates object creation, method calls, and show how memory is allocated.'
    },
    {
      id: 'course-structure',
      title: 'Course Structure and Learning Path',
      content: `
        <h3>Java Learning Roadmap</h3>
        <p>Follow this structured path to master Java programming systematically.</p>
        
        <h4>Learning Modules:</h4>
        <ol>
          <li><strong>Java Basics</strong> (2 weeks)
            <ul>
              <li>Syntax and basic concepts</li>
              <li>Variables and data types</li>
              <li>Control flow statements</li>
            </ul>
          </li>
          <li><strong>Object-Oriented Programming</strong> (3 weeks)
            <ul>
              <li>Classes and objects</li>
              <li>Inheritance and polymorphism</li>
              <li>Abstraction and interfaces</li>
            </ul>
          </li>
          <li><strong>Advanced Java</strong> (4 weeks)
            <ul>
              <li>Collections framework</li>
              <li>Exception handling</li>
              <li>Multithreading</li>
              <li>File I/O operations</li>
            </ul>
          </li>
          <li><strong>Real-World Projects</strong> (3 weeks)
            <ul>
              <li>Banking application</li>
              <li>Library management system</li>
              <li>E-commerce console app</li>
            </ul>
          </li>
        </ol>
      `,
      code: `// Example of progressive learning - from simple to complex
public class LearningPath {
    
    // Week 1: Basic syntax
    public static void basicSyntax() {
        System.out.println("=== Week 1: Basic Syntax ===");
        int x = 10;
        String name = "Java Learner";
        System.out.println("Hello " + name + ", x = " + x);
    }
    
    // Week 2: Control structures
    public static void controlStructures() {
        System.out.println("\\n=== Week 2: Control Structures ===");
        for (int i = 1; i <= 5; i++) {
            if (i % 2 == 0) {
                System.out.println(i + " is even");
            } else {
                System.out.println(i + " is odd");
            }
        }
    }
    
    // Week 3-4: Methods and OOP basics
    public static class Student {
        private String name;
        private int level;
        
        public Student(String name, int level) {
            this.name = name;
            this.level = level;
        }
        
        public void progress() {
            level++;
            System.out.println(name + " advanced to level " + level);
        }
    }
    
    // Week 5-6: Advanced OOP
    interface Course {
        void completeModule(String moduleName);
    }
    
    static class JavaCourse implements Course {
        private List<String> completedModules = new ArrayList<>();
        
        @Override
        public void completeModule(String moduleName) {
            completedModules.add(moduleName);
            System.out.println("Completed: " + moduleName);
            System.out.println("Total completed: " + completedModules.size());
        }
    }
    
    public static void main(String[] args) {
        // Demonstrate progressive learning
        basicSyntax();
        controlStructures();
        
        // OOP demonstration
        Student student = new Student("Alice", 1);
        student.progress();
        
        // Interface usage
        Course course = new JavaCourse();
        course.completeModule("Java Basics");
        course.completeModule("OOP Principles");
        
        System.out.println("\\n=== Keep Learning! ===");
    }
}`,
      language: 'java',
      exercise: 'Create a personal learning tracker that stores completed modules and progress level.'
    },
    {
      id: 'types',
      title: 'Data Types in Java',
      content: `
        <h3>Understanding Java Data Types</h3>
        <p>Java has two main categories of data types: primitive and reference types.</p>
      `,
      code: `public class DataTypesDemo {
    public static void main(String[] args) {
        System.out.println("=== PRIMITIVE DATA TYPES ===");
        
        // Integer types
        byte byteVar = 127;          // 8-bit (-128 to 127)
        short shortVar = 32767;      // 16-bit (-32768 to 32767)
        int intVar = 2147483647;     // 32-bit (-2^31 to 2^31-1)
        long longVar = 9223372036854775807L; // 64-bit (add L suffix)
        
        // Floating-point types
        float floatVar = 3.14f;      // 32-bit (add f suffix)
        double doubleVar = 3.141592653589793; // 64-bit
        
        // Character type
        char charVar = 'A';          // 16-bit Unicode
        char unicodeChar = '\\u0041'; // Unicode for 'A'
        
        // Boolean type
        boolean boolVar = true;      // true or false
        
        System.out.println("byte: " + byteVar);
        System.out.println("short: " + shortVar);
        System.out.println("int: " + intVar);
        System.out.println("long: " + longVar);
        System.out.println("float: " + floatVar);
        System.out.println("double: " + doubleVar);
        System.out.println("char: " + charVar);
        System.out.println("unicode char: " + unicodeChar);
        System.out.println("boolean: " + boolVar);
        
        System.out.println("\\n=== REFERENCE DATA TYPES ===");
        
        // String (reference type)
        String stringVar = "Hello Java";
        
        // Array (reference type)
        int[] arrayVar = {1, 2, 3, 4, 5};
        
        // Custom object (reference type)
        Person personVar = new Person("John", 25);
        
        System.out.println("String: " + stringVar);
        System.out.println("Array: " + Arrays.toString(arrayVar));
        System.out.println("Person: " + personVar);
        
        System.out.println("\\n=== TYPE RANGES ===");
        System.out.println("Byte Range: " + Byte.MIN_VALUE + " to " + Byte.MAX_VALUE);
        System.out.println("Integer Range: " + Integer.MIN_VALUE + " to " + Integer.MAX_VALUE);
        System.out.println("Float Range: " + Float.MIN_VALUE + " to " + Float.MAX_VALUE);
    }
}

class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}`,
      language: 'java',
      exercise: 'Create a program that demonstrates overflow and underflow in different data types.'
    },
    {
      id: 'variables',
      title: 'Variables in Java',
      content: `
        <h3>Working with Variables</h3>
        <p>Variables are containers for storing data values in Java.</p>
      `,
      code: `public class VariablesDemo {
    
    // Instance variables (non-static fields)
    private int instanceCount = 0;
    private String instanceName = "Demo";
    
    // Static variables (class fields)
    private static int staticCount = 0;
    public static final String CLASS_NAME = "VariablesDemo";
    
    // Constants (static final)
    public static final double PI = 3.14159;
    public static final int MAX_USERS = 1000;
    
    public void demonstrateVariables() {
        // Local variables
        int localVar = 42;
        String localString = "Method local";
        
        // Final local variable (constant within method)
        final int FINAL_LOCAL = 100;
        
        System.out.println("Local variable: " + localVar);
        System.out.println("Local string: " + localString);
        System.out.println("Final local: " + FINAL_LOCAL);
        
        // Modifying instance variables
        instanceCount++;
        instanceName = "Modified Demo";
        
        // Modifying static variable
        staticCount++;
    }
    
    public void variableScopeDemo() {
        int x = 10; // Method scope
        
        if (x > 5) {
            int y = 20; // Block scope - only accessible in this if block
            System.out.println("x = " + x + ", y = " + y);
            
            // Can shadow variables
            String instanceName = "Shadowed"; // Shadows instance variable
            System.out.println("Shadowed name: " + instanceName);
        }
        
        // y is not accessible here - out of scope
        // System.out.println(y); // This would cause compilation error
        
        // But instanceName refers to instance variable again
        System.out.println("Instance name: " + this.instanceName);
    }
    
    public static void staticMethod() {
        // Can only access static variables in static method
        System.out.println("Static count: " + staticCount);
        System.out.println("Class name: " + CLASS_NAME);
        
        // Cannot access instance variables directly
        // System.out.println(instanceCount); // Compilation error
    }
    
    public static void main(String[] args) {
        System.out.println("=== VARIABLES DEMONSTRATION ===");
        
        // Using static variables (no instance needed)
        System.out.println("PI constant: " + PI);
        System.out.println("Class name: " + CLASS_NAME);
        
        // Create instances to work with instance variables
        VariablesDemo demo1 = new VariablesDemo();
        VariablesDemo demo2 = new VariablesDemo();
        
        demo1.demonstrateVariables();
        demo2.demonstrateVariables();
        
        demo1.variableScopeDemo();
        
        // Show static variable is shared across instances
        System.out.println("\\n=== STATIC VARIABLE SHARING ===");
        System.out.println("Static count after both instances: " + staticCount);
        
        // Variable naming conventions
        System.out.println("\\n=== NAMING CONVENTIONS ===");
        int camelCaseVariable = 1;
        final String UPPER_CASE_CONSTANT = "CONSTANT";
        String descriptiveVariableName = "Good practice";
        
        System.out.println("camelCase: " + camelCaseVariable);
        System.out.println("UPPER_CASE: " + UPPER_CASE_CONSTANT);
        System.out.println("descriptive: " + descriptiveVariableName);
    }
}`,
      language: 'java',
      exercise: 'Create a program with different types of variables and demonstrate their scope and lifetime.'
    },
    {
    id: 'primitive-types',
    title: 'Primitive Types',
    content: `
      <h3>Java Primitive Data Types</h3>
      <p>Primitive types are the most basic data types in Java. They are not objects and hold raw values.</p>
      
      <h4>8 Primitive Types:</h4>
      <table border="1">
        <tr><th>Type</th><th>Size</th><th>Range</th><th>Default</th><th>Example</th></tr>
        <tr><td>byte</td><td>8 bits</td><td>-128 to 127</td><td>0</td><td>byte b = 100;</td></tr>
        <tr><td>short</td><td>16 bits</td><td>-32,768 to 32,767</td><td>0</td><td>short s = 1000;</td></tr>
        <tr><td>int</td><td>32 bits</td><td>-2^31 to 2^31-1</td><td>0</td><td>int i = 100000;</td></tr>
        <tr><td>long</td><td>64 bits</td><td>-2^63 to 2^63-1</td><td>0L</td><td>long l = 100000L;</td></tr>
        <tr><td>float</td><td>32 bits</td><td>±1.4E-45 to ±3.4E+38</td><td>0.0f</td><td>float f = 3.14f;</td></tr>
        <tr><td>double</td><td>64 bits</td><td>±4.9E-324 to ±1.7E+308</td><td>0.0d</td><td>double d = 3.14159;</td></tr>
        <tr><td>char</td><td>16 bits</td><td>\\u0000 to \\uffff</td><td>\\u0000</td><td>char c = 'A';</td></tr>
        <tr><td>boolean</td><td>1 bit</td><td>true or false</td><td>false</td><td>boolean flag = true;</td></tr>
      </table>
    `,
    code: `public class PrimitiveTypesDemo {
    public static void main(String[] args) {
        // Integer types
        byte byteValue = 120;
        short shortValue = 32000;
        int intValue = 2000000000;
        long longValue = 9000000000000000000L;
        
        // Floating point types
        float floatValue = 3.14159f;
        double doubleValue = 3.141592653589793;
        
        // Character type
        char charValue = 'J';
        char unicodeChar = '\\u004A'; // Unicode for 'J'
        
        // Boolean type
        boolean booleanValue = true;
        
        System.out.println("=== Primitive Types ===");
        System.out.println("byte: " + byteValue);
        System.out.println("short: " + shortValue);
        System.out.println("int: " + intValue);
        System.out.println("long: " + longValue);
        System.out.println("float: " + floatValue);
        System.out.println("double: " + doubleValue);
        System.out.println("char: " + charValue);
        System.out.println("unicode char: " + unicodeChar);
        System.out.println("boolean: " + booleanValue);
        
        // Demonstrating ranges
        System.out.println("\\n=== Type Ranges ===");
        System.out.println("Byte Min: " + Byte.MIN_VALUE + ", Max: " + Byte.MAX_VALUE);
        System.out.println("Integer Min: " + Integer.MIN_VALUE + ", Max: " + Integer.MAX_VALUE);
        System.out.println("Float Min: " + Float.MIN_VALUE + ", Max: " + Float.MAX_VALUE);
        
        // Size in bytes
        System.out.println("\\n=== Type Sizes ===");
        System.out.println("byte size: " + Byte.BYTES + " bytes");
        System.out.println("int size: " + Integer.BYTES + " bytes");
        System.out.println("double size: " + Double.BYTES + " bytes");
    }
}`,
    language: 'java',
    exercise: 'Create a program that demonstrates overflow and underflow for each numeric primitive type.'
  },
  {
    id: 'reference-types',
    title: 'Reference Types',
    content: `
      <h3>Reference Types in Java</h3>
      <p>Reference types store references to objects in memory. They include classes, interfaces, arrays, and enums.</p>
      
      <h4>Key Characteristics:</h4>
      <ul>
        <li>Store memory addresses (references)</li>
        <li>Default value is null</li>
        <li>Use heap memory</li>
        <li>Support methods and inheritance</li>
        <li>Comparison uses equals() method</li>
      </ul>
      
      <h4>Common Reference Types:</h4>
      <ul>
        <li>String</li>
        <li>Arrays</li>
        <li>Custom Classes</li>
        <li>Wrapper Classes (Integer, Double, etc.)</li>
        <li>Collections (List, Map, Set)</li>
      </ul>
    `,
    code: `import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

public class ReferenceTypesDemo {
    public static void main(String[] args) {
        System.out.println("=== Reference Types Demo ===");
        
        // String reference type
        String str1 = "Hello";
        String str2 = new String("World");
        System.out.println("String 1: " + str1);
        System.out.println("String 2: " + str2);
        
        // Array reference type
        int[] numbers = {1, 2, 3, 4, 5};
        String[] names = {"Alice", "Bob", "Charlie"};
        System.out.println("Numbers array: " + Arrays.toString(numbers));
        System.out.println("Names array: " + Arrays.toString(names));
        
        // Custom class reference type
        Person person1 = new Person("John", 25);
        Person person2 = new Person("Sarah", 30);
        System.out.println("Person 1: " + person1);
        System.out.println("Person 2: " + person2);
        
        // Collection reference type
        List<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        System.out.println("Fruits list: " + fruits);
        
        // Reference comparison vs value comparison
        System.out.println("\\n=== Reference Comparison ===");
        String s1 = "Java";
        String s2 = "Java";
        String s3 = new String("Java");
        
        System.out.println("s1 == s2: " + (s1 == s2)); // true (same reference)
        System.out.println("s1 == s3: " + (s1 == s3)); // false (different references)
        System.out.println("s1.equals(s3): " + s1.equals(s3)); // true (same value)
        
        // Null demonstration
        System.out.println("\\n=== Null References ===");
        Person nullPerson = null;
        System.out.println("Null person: " + nullPerson);
        // System.out.println(nullPerson.getName()); // NullPointerException!
        
        // Avoiding NullPointerException
        if (nullPerson != null) {
            System.out.println("Person name: " + nullPerson.getName());
        } else {
            System.out.println("Person reference is null");
        }
    }
}

class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return age == person.age && name.equals(person.name);
    }
}`,
    language: 'java',
    exercise: 'Create a program that demonstrates the difference between == and equals() for various reference types.'
  },
  {
    id: 'primitive-vs-reference',
    title: 'Primitive Types vs Reference Types',
    content: `
      <h3>Comparing Primitive and Reference Types</h3>
      <p>Understanding the key differences between primitive and reference types is crucial for Java programming.</p>
      
      <h4>Key Differences:</h4>
      <table border="1">
        <tr><th>Aspect</th><th>Primitive Types</th><th>Reference Types</th></tr>
        <tr><td>Storage</td><td>Store actual values</td><td>Store memory addresses</td></tr>
        <tr><td>Memory</td><td>Stack memory</td><td>Heap memory</td></tr>
        <tr><td>Default Value</td><td>Type-specific (0, false, etc.)</td><td>null</td></tr>
        <tr><td>Size</td><td>Fixed (1-8 bytes)</td><td>Variable</td></tr>
        <tr><td>Operations</td><td>Arithmetic, logical</td><td>Method calls, field access</td></tr>
        <tr><td>Comparison</td><td>== compares values</td><td>== compares references</td></tr>
        <tr><td>Performance</td><td>Faster</td><td>Slower (memory allocation)</td></tr>
      </table>
    `,
    code: `public class PrimitiveVsReference {
    public static void main(String[] args) {
        System.out.println("=== Primitive vs Reference Types ===");
        
        // Primitive types - value semantics
        int x = 10;
        int y = x; // Copy of value
        y = 20; // Changing y doesn't affect x
        
        System.out.println("Primitive example:");
        System.out.println("x = " + x + ", y = " + y);
        
        // Reference types - reference semantics
        int[] arr1 = {1, 2, 3};
        int[] arr2 = arr1; // Copy of reference (both point to same object)
        arr2[0] = 100; // Changing through arr2 affects arr1
        
        System.out.println("\\nReference example:");
        System.out.println("arr1[0] = " + arr1[0] + ", arr2[0] = " + arr2[0]);
        
        // Method parameter passing
        System.out.println("\\n=== Method Parameter Passing ===");
        int primitiveParam = 5;
        int[] referenceParam = {1, 2, 3};
        
        System.out.println("Before method call:");
        System.out.println("primitiveParam = " + primitiveParam);
        System.out.println("referenceParam[0] = " + referenceParam[0]);
        
        modifyValues(primitiveParam, referenceParam);
        
        System.out.println("After method call:");
        System.out.println("primitiveParam = " + primitiveParam); // Unchanged
        System.out.println("referenceParam[0] = " + referenceParam[0]); // Changed!
        
        // Wrapper classes (object representation of primitives)
        System.out.println("\\n=== Wrapper Classes ===");
        Integer wrappedInt = Integer.valueOf(42); // Boxing
        int unwrappedInt = wrappedInt.intValue(); // Unboxing
        
        // Auto-boxing and auto-unboxing
        Integer autoBoxed = 42; // Auto-boxing
        int autoUnboxed = autoBoxed; // Auto-unboxing
        
        System.out.println("Wrapped: " + wrappedInt);
        System.out.println("Auto-boxed: " + autoBoxed);
        System.out.println("Auto-unboxed: " + autoUnboxed);
        
        // Null safety with wrappers
        Integer nullableInt = null;
        // int danger = nullableInt; // NullPointerException!
        
        if (nullableInt != null) {
            int safe = nullableInt;
            System.out.println("Safe unboxing: " + safe);
        }
    }
    
    public static void modifyValues(int primitive, int[] reference) {
        primitive = 100; // Changes local copy only
        reference[0] = 999; // Changes the actual array object
    }
}`,
    language: 'java',
    exercise: 'Create a program that demonstrates pass-by-value for primitives and pass-by-reference for objects.'
  },
  {
    id: 'strings',
    title: 'Strings in Java',
    content: `
      <h3>Working with Strings</h3>
      <p>Strings are immutable sequences of characters. They are one of the most commonly used reference types.</p>
      
      <h4>String Characteristics:</h4>
      <ul>
        <li>Immutable - cannot be changed after creation</li>
        <li>Stored in String Pool for memory efficiency</li>
        <li>Implement CharSequence interface</li>
        <li>Support wide range of manipulation methods</li>
      </ul>
      
      <h4>String Creation Methods:</h4>
      <ul>
        <li>String literal: "hello" (uses String Pool)</li>
        <li>new String(): new String("hello") (creates new object)</li>
        <li>StringBuilder/StringBuffer for mutable operations</li>
      </ul>
    `,
    code: `public class StringDemo {
    public static void main(String[] args) {
        System.out.println("=== String Basics ===");
        
        // Different ways to create strings
        String str1 = "Hello"; // String literal (goes to String Pool)
        String str2 = new String("Hello"); // New object
        String str3 = "Hello"; // Reuses from String Pool
        
        System.out.println("str1: " + str1);
        System.out.println("str2: " + str2);
        System.out.println("str3: " + str3);
        
        // Reference comparison vs value comparison
        System.out.println("\\n=== String Comparison ===");
        System.out.println("str1 == str2: " + (str1 == str2)); // false
        System.out.println("str1 == str3: " + (str1 == str3)); // true
        System.out.println("str1.equals(str2): " + str1.equals(str2)); // true
        
        // String methods
        System.out.println("\\n=== String Methods ===");
        String text = " Java Programming ";
        
        System.out.println("Original: '" + text + "'");
        System.out.println("Length: " + text.length());
        System.out.println("Trimmed: '" + text.trim() + "'");
        System.out.println("Uppercase: " + text.toUpperCase());
        System.out.println("Lowercase: " + text.toLowerCase());
        System.out.println("Contains 'Pro': " + text.contains("Pro"));
        System.out.println("Index of 'Pro': " + text.indexOf("Pro"));
        System.out.println("Substring(5, 10): " + text.substring(5, 10));
        System.out.println("Replace 'Java' with 'Python': " + text.replace("Java", "Python"));
        System.out.println("Starts with ' Java': " + text.startsWith(" Java"));
        System.out.println("Ends with 'ing ': " + text.endsWith("ing "));
        
        // String concatenation
        System.out.println("\\n=== String Concatenation ===");
        String firstName = "John";
        String lastName = "Doe";
        String fullName = firstName + " " + lastName;
        String concatName = firstName.concat(" ").concat(lastName);
        
        System.out.println("Using + operator: " + fullName);
        System.out.println("Using concat(): " + concatName);
        
        // String formatting
        System.out.println("\\n=== String Formatting ===");
        String formatted = String.format("Name: %s, Age: %d, Salary: $%.2f", "Alice", 30, 50000.5555);
        System.out.println(formatted);
        
        // StringBuilder for mutable strings
        System.out.println("\\n=== StringBuilder ===");
        StringBuilder sb = new StringBuilder();
        sb.append("Hello");
        sb.append(" ");
        sb.append("World");
        sb.insert(5, " Beautiful");
        sb.reverse();
        
        System.out.println("StringBuilder result: " + sb.toString());
        
        // String immutability demonstration
        System.out.println("\\n=== String Immutability ===");
        String immutable = "Original";
        System.out.println("Before modification: " + immutable);
        immutable.toUpperCase(); // Returns new string, original unchanged
        System.out.println("After toUpperCase(): " + immutable);
        immutable = immutable.toUpperCase(); // Reassign reference
        System.out.println("After reassignment: " + immutable);
    }
}`,
    language: 'java',
    exercise: 'Create a program that takes a sentence and counts vowels, consonants, words, and reverses the string.'
  },
  {
    id: 'escape-sequences',
    title: 'Escape Sequences',
    content: `
      <h3>Java Escape Sequences</h3>
      <p>Escape sequences are special characters that allow you to include characters that are otherwise difficult to type.</p>
      
      <h4>Common Escape Sequences:</h4>
      <table border="1">
        <tr><th>Escape Sequence</th><th>Description</th><th>Example</th></tr>
        <tr><td>\\t</td><td>Tab</td><td>"Hello\\tWorld"</td></tr>
        <tr><td>\\n</td><td>New line</td><td>"Line1\\nLine2"</td></tr>
        <tr><td>\\r</td><td>Carriage return</td><td>"Hello\\rWorld"</td></tr>
        <tr><td>\\\\</td><td>Backslash</td><td>"C:\\\\Program Files"</td></tr>
        <tr><td>\\"</td><td>Double quote</td><td>"He said \\"Hello\\""</td></tr>
        <tr><td>\\'</td><td>Single quote</td><td>"It\\'s mine"</td></tr>
        <tr><td>\\b</td><td>Backspace</td><td>"Hello\\b"</td></tr>
        <tr><td>\\f</td><td>Form feed</td><td>"Page1\\fPage2"</td></tr>
        <tr><td>\\uXXXX</td><td>Unicode character</td><td>"\\u00A9" for ©</td></tr>
      </table>
    `,
    code: `public class EscapeSequencesDemo {
    public static void main(String[] args) {
        System.out.println("=== Escape Sequences Demo ===");
        
        // Tab example
        System.out.println("Name:\\tAge:\\tCity:");
        System.out.println("John:\\t25:\\tNew York");
        System.out.println("Alice:\\t30:\\tLondon");
        
        // New line example
        System.out.println("\\nMulti-line text:");
        System.out.println("Line 1\\nLine 2\\nLine 3");
        
        // Quotes example
        System.out.println("\\nQuotes in strings:");
        System.out.println("She said: \\\"Hello, World!\\\"");
        System.out.println("It\\'s a beautiful day");
        
        // Backslash example
        System.out.println("\\nFile paths:");
        System.out.println("Windows: C:\\\\Users\\\\John\\\\Documents");
        System.out.println("Unix: /home/john/documents");
        
        // Backspace example (limited effect in consoles)
        System.out.println("\\nBackspace example:");
        System.out.println("Hello\\b\\b\\bHi"); // HellHi
        
        // Unicode characters
        System.out.println("\\nUnicode characters:");
        System.out.println("Copyright: \\u00A9");
        System.out.println("Euro: \\u20AC");
        System.out.println("Smiley: \\u263A");
        System.out.println("Heart: \\u2764");
        
        // Form feed (mostly for printers)
        System.out.println("Page 1\\fPage 2");
        
        // Carriage return
        System.out.println("\\nCarriage return:");
        System.out.println("Old Text\\rNew"); // Overwrites beginning
        
        // Combining escape sequences
        System.out.println("\\nCombined example:");
        System.out.println("Student Records:\\n");
        System.out.println("Name\\t\\tGrade\\tStatus");
        System.out.println("========================");
        System.out.println("John\\t\\tA\\tPassed");
        System.out.println("Alice\\t\\tB\\tPassed");
        System.out.println("Bob\\t\\tF\\tFailed");
        
        // Escape sequences in character literals
        char tabChar = '\\t';
        char newlineChar = '\\n';
        char quoteChar = '\\'';
        char backslashChar = '\\\\';
        
        System.out.println("\\nEscape sequences in chars:");
        System.out.println("Tab character: '" + tabChar + "'");
        System.out.println("Quote character: '" + quoteChar + "'");
    }
}`,
    language: 'java',
    exercise: 'Create a program that displays a formatted table using escape sequences with student data.'
  },
  {
    id: 'constants',
    title: 'Constants in Java',
    content: `
      <h3>Working with Constants</h3>
      <p>Constants are variables whose values cannot be changed once assigned. Use the 'final' keyword.</p>
      
      <h4>Constant Naming Convention:</h4>
      <ul>
        <li>Use UPPER_CASE with underscores</li>
        <li>Declare as static final for class constants</li>
        <li>Initialize at declaration or in constructor</li>
        <li>Use for values that shouldn't change</li>
      </ul>
      
      <h4>Benefits of Constants:</h4>
      <ul>
        <li>Improve code readability</li>
        <li>Prevent accidental modification</li>
        <li>Make maintenance easier</li>
        <li>Enable compiler optimizations</li>
      </ul>
    `,
    code: `public class ConstantsDemo {
    
    // Class constants (static final)
    public static final double PI = 3.141592653589793;
    public static final int MAX_USERS = 1000;
    public static final String APPLICATION_NAME = "MyApp";
    public static final String[] VALID_COLORS = {"RED", "GREEN", "BLUE"};
    
    // Instance constants (final)
    private final int id;
    private final String name;
    private final long createdAt;
    
    public ConstantsDemo(int id, String name) {
        // Instance constants must be initialized in constructor
        this.id = id;
        this.name = name;
        this.createdAt = System.currentTimeMillis();
    }
    
    public void demonstrateConstants() {
        // Local constants
        final int LOCAL_CONSTANT = 42;
        final String GREETING = "Hello, World!";
        
        System.out.println("=== Constants Demonstration ===");
        System.out.println("PI: " + PI);
        System.out.println("MAX_USERS: " + MAX_USERS);
        System.out.println("APP_NAME: " + APPLICATION_NAME);
        System.out.println("Local constant: " + LOCAL_CONSTANT);
        System.out.println("Greeting: " + GREETING);
        System.out.println("Instance ID: " + id);
        System.out.println("Instance name: " + name);
        System.out.println("Created at: " + createdAt);
        
        // Array constants - elements can be modified, but reference cannot change
        System.out.println("\\n=== Array Constants ===");
        System.out.println("Original colors: " + java.util.Arrays.toString(VALID_COLORS));
        VALID_COLORS[0] = "YELLOW"; // Allowed - modifying content
        System.out.println("Modified colors: " + java.util.Arrays.toString(VALID_COLORS));
        
        // This would cause compilation error:
        // VALID_COLORS = new String[]{"BLACK", "WHITE"}; // Cannot reassign final reference
    }
    
    public static class MathConstants {
        // Mathematical constants
        public static final double E = 2.718281828459045;
        public static final double GOLDEN_RATIO = 1.618033988749895;
        public static final double SQRT2 = 1.4142135623730951;
    }
    
    public static class Config {
        // Configuration constants
        public static final int TIMEOUT = 30; // seconds
        public static final int MAX_RETRIES = 3;
        public static final String DATABASE_URL = "jdbc:mysql://localhost:3306/mydb";
        public static final boolean DEBUG_MODE = true;
    }
    
    public static void main(String[] args) {
        ConstantsDemo demo = new ConstantsDemo(1, "Test Instance");
        demo.demonstrateConstants();
        
        System.out.println("\\n=== Mathematical Constants ===");
        System.out.println("E: " + MathConstants.E);
        System.out.println("Golden Ratio: " + MathConstants.GOLDEN_RATIO);
        System.out.println("Square root of 2: " + MathConstants.SQRT2);
        
        System.out.println("\\n=== Configuration Constants ===");
        System.out.println("Timeout: " + Config.TIMEOUT + " seconds");
        System.out.println("Max Retries: " + Config.MAX_RETRIES);
        System.out.println("Debug Mode: " + Config.DEBUG_MODE);
        
        // Using constants in calculations
        System.out.println("\\n=== Using Constants in Calculations ===");
        double radius = 5.0;
        double area = PI * radius * radius;
        double circumference = 2 * PI * radius;
        
        System.out.println("Radius: " + radius);
        System.out.println("Area: " + area);
        System.out.println("Circumference: " + circumference);
        
        // Enum constants
        System.out.println("\\n=== Enum Constants ===");
        for (Day day : Day.values()) {
            System.out.println(day + " is weekend: " + day.isWeekend());
        }
    }
    
    // Enum example for constants
    enum Day {
        MONDAY("Weekday"), TUESDAY("Weekday"), WEDNESDAY("Weekday"),
        THURSDAY("Weekday"), FRIDAY("Weekday"), SATURDAY("Weekend"), SUNDAY("Weekend");
        
        private final String type;
        
        Day(String type) {
            this.type = type;
        }
        
        public boolean isWeekend() {
            return this.type.equals("Weekend");
        }
    }
}`,
    language: 'java',
    exercise: 'Create a program that uses constants for mathematical calculations and configuration settings.'
  },
  {
    id: 'arithmetic-expressions',
    title: 'Arithmetic Expressions',
    content: `
      <h3>Arithmetic Operations in Java</h3>
      <p>Java supports all basic arithmetic operations with proper operator precedence.</p>
      
      <h4>Arithmetic Operators:</h4>
      <table border="1">
        <tr><th>Operator</th><th>Operation</th><th>Example</th><th>Result</th></tr>
        <tr><td>+</td><td>Addition</td><td>5 + 3</td><td>8</td></tr>
        <tr><td>-</td><td>Subtraction</td><td>5 - 3</td><td>2</td></tr>
        <tr><td>*</td><td>Multiplication</td><td>5 * 3</td><td>15</td></tr>
        <tr><td>/</td><td>Division</td><td>5 / 3</td><td>1 (int)</td></tr>
        <tr><td>%</td><td>Modulus</td><td>5 % 3</td><td>2</td></tr>
        <tr><td>++</td><td>Increment</td><td>x++</td><td>x + 1</td></tr>
        <tr><td>--</td><td>Decrement</td><td>x--</td><td>x - 1</td></tr>
      </table>
    `,
    code: `public class ArithmeticExpressions {
    public static void main(String[] args) {
        System.out.println("=== Basic Arithmetic Operations ===");
        
        int a = 20, b = 6;
        
        System.out.println("a = " + a + ", b = " + b);
        System.out.println("Addition (a + b): " + (a + b));
        System.out.println("Subtraction (a - b): " + (a - b));
        System.out.println("Multiplication (a * b): " + (a * b));
        System.out.println("Division (a / b): " + (a / b));
        System.out.println("Modulus (a % b): " + (a % b));
        
        System.out.println("\\n=== Integer vs Floating-Point Division ===");
        int x = 7, y = 2;
        System.out.println("Integer division (7 / 2): " + (x / y));
        System.out.println("Floating-point division (7.0 / 2.0): " + (7.0 / 2.0));
        System.out.println("Casting to double ((double)7 / 2): " + ((double)x / y));
        
        System.out.println("\\n=== Increment and Decrement Operators ===");
        int count = 5;
        System.out.println("Original count: " + count);
        System.out.println("Post-increment (count++): " + count++); // Use then increment
        System.out.println("After post-increment: " + count);
        System.out.println("Pre-increment (++count): " + (++count)); // Increment then use
        System.out.println("After pre-increment: " + count);
        
        System.out.println("\\n=== Compound Assignment Operators ===");
        int num = 10;
        System.out.println("Original num: " + num);
        num += 5; // num = num + 5
        System.out.println("After num += 5: " + num);
        num -= 3; // num = num - 3
        System.out.println("After num -= 3: " + num);
        num *= 2; // num = num * 2
        System.out.println("After num *= 2: " + num);
        num /= 4; // num = num / 4
        System.out.println("After num /= 4: " + num);
        num %= 3; // num = num % 3
        System.out.println("After num %= 3: " + num);
        
        System.out.println("\\n=== Special Cases ===");
        System.out.println("Division by zero (floating-point): " + (5.0 / 0)); // Infinity
        System.out.println("Division by zero (integer): " + (5 / 0)); // ArithmeticException
        
        System.out.println("\\n=== Mathematical Expressions ===");
        double result1 = (10 + 5) * 2 / 3.0;
        double result2 = Math.pow(2, 3) + Math.sqrt(16);
        double result3 = (a + b) * (a - b) / 2.0;
        
        System.out.println("(10 + 5) * 2 / 3.0 = " + result1);
        System.out.println("2^3 + sqrt(16) = " + result2);
        System.out.println("(a+b)*(a-b)/2.0 = " + result3);
        
        System.out.println("\\n=== Modulus Operation Examples ===");
        System.out.println("15 % 4 = " + (15 % 4)); // Remainder
        System.out.println("Even/Odd check:");
        for (int i = 1; i <= 5; i++) {
            System.out.println(i + " is " + (i % 2 == 0 ? "even" : "odd"));
        }
        
        System.out.println("\\n=== Currency Calculation ===");
        double price = 19.99;
        int quantity = 3;
        double taxRate = 0.08;
        double subtotal = price * quantity;
        double tax = subtotal * taxRate;
        double total = subtotal + tax;
        
        System.out.println("Price: $" + price);
        System.out.println("Quantity: " + quantity);
        System.out.println("Subtotal: $" + subtotal);
        System.out.println("Tax (8%): $" + tax);
        System.out.println("Total: $" + total);
    }
}`,
    language: 'java',
    exercise: 'Create a program that calculates compound interest using the formula A = P(1 + r/n)^(nt)'
  },
]
    },
  
  'c-programming': {
    "title": "c Programming",
    "description": "Master C programming from fundamentals to advanced concepts with practical examples",
    "totalTopics": 12,
    "topics": [
      {
        "id": "introduction",
        "title": "Introduction to C Programming",
        "content": `
          <h3>Welcome to C Programming!</h3>
          <p>C is a powerful, efficient programming language that forms the foundation for many modern languages and systems.</p>
          
          <h4>What You'll Learn:</h4>
          <ul>
            <li>C syntax and fundamental concepts</li>
            <li>Memory management and pointers</li>
            <li>Data structures and algorithms in C</li>
            <li>File handling and system programming</li>
            <li>Practical projects and applications</li>
          </ul>
          
          <h4>Why Learn C?</h4>
          <ul>
            <li>Foundation for C++, Java, and other languages</li>
            <li>High performance and efficiency</li>
            <li>System-level programming capabilities</li>
            <li>Widely used in embedded systems and OS development</li>
          </ul>
        `,
        "code": `// Your first C program
#include <stdio.h>

int main() {
    printf("Welcome to C Programming!\\n");
    printf("Let's start our journey to become C experts!\\n");
    return 0;
}`,
        "language": "c",
        "exercise": "Write a program that prints a personalized welcome message."
      },
      {
        "id": "installation",
        "title": "Installation and Setup (VS Code + Compiler)",
        "content": `
          <h3>Setting Up C Development Environment</h3>
          <p>Learn how to install a C compiler and set up your development environment.</p>
          
          <h4>Installation Steps:</h4>
          <ol>
            <li>Install Visual Studio Code</li>
            <li>Install C/C++ extension pack</li>
            <li>Install GCC compiler (MinGW-w64 for Windows)</li>
            <li>Configure environment variables</li>
            <li>Test your setup with a simple program</li>
          </ol>
          
          <h4>Compiler Options:</h4>
          <ul>
            <li>GCC (GNU Compiler Collection)</li>
            <li>Clang</li>
            <li>Microsoft Visual C++ Compiler</li>
          </ul>
        `,
        "code": `// Verify C installation
#include <stdio.h>

int main() {
    printf("C Environment Check\\n");
    printf("Compilation successful!\\n");
    printf("Your C environment is ready.\\n");
    return 0;
}`,
        "language": "c",
        "exercise": "Install the necessary tools and run this verification program."
      },
      {
        "id": "variables-data-types",
        "title": "Variables, Data Types & Input/Output",
        "content": `
          <h3>Fundamental Building Blocks of C</h3>
          <p>Learn about variables, data types, and basic input/output operations.</p>
          
          <h4>Key Concepts:</h4>
          <ul>
            <li><strong>Variables:</strong> Named memory locations</li>
            <li><strong>Data Types:</strong> int, float, char, double, etc.</li>
            <li><strong>Constants:</strong> Fixed values that don't change</li>
            <li><strong>I/O Functions:</strong> printf(), scanf(), getchar(), putchar()</li>
            <li><strong>Format Specifiers:</strong> %d, %f, %c, %s</li>
          </ul>
        `,
        "code": `#include <stdio.h>

int main() {
    // Variable declarations
    int age = 25;
    float height = 5.9;
    char grade = 'A';
    char name[] = "John Doe";
    
    // Output using printf
    printf("=== Student Information ===\\n");
    printf("Name: %s\\n", name);
    printf("Age: %d years\\n", age);
    printf("Height: %.1f feet\\n", height);
    printf("Grade: %c\\n", grade);
    
    // Input using scanf
    int newAge;
    printf("\\nEnter your age: ");
    scanf("%d", &newAge);
    printf("You entered: %d\\n", newAge);
    
    return 0;
}`,
        "language": "c",
        "exercise": "Create a program that takes user input for name, age, and salary, then displays it formatted."
      },
      {
        "id": "operators",
        "title": "Instructions & Operators",
        "content": `
          <h3>C Operators and Expressions</h3>
          <p>Understand different types of operators and how to use them in expressions.</p>
          
          <h4>Operator Types:</h4>
          <ul>
            <li><strong>Arithmetic:</strong> +, -, *, /, %</li>
            <li><strong>Relational:</strong> ==, !=, >, <, >=, <=</li>
            <li><strong>Logical:</strong> &&, ||, !</li>
            <li><strong>Assignment:</strong> =, +=, -=, *=, /=</li>
            <li><strong>Bitwise:</strong> &, |, ^, ~, <<, >></li>
            <li><strong>Increment/Decrement:</strong> ++, --</li>
          </ul>
        `,
        "code": `#include <stdio.h>

int main() {
    int a = 10, b = 3;
    
    // Arithmetic operators
    printf("Arithmetic Operations:\\n");
    printf("%d + %d = %d\\n", a, b, a + b);
    printf("%d - %d = %d\\n", a, b, a - b);
    printf("%d * %d = %d\\n", a, b, a * b);
    printf("%d / %d = %d\\n", a, b, a / b);
    printf("%d %% %d = %d\\n", a, b, a % b);
    
    // Relational operators
    printf("\\nRelational Operations:\\n");
    printf("%d == %d: %d\\n", a, b, a == b);
    printf("%d != %d: %d\\n", a, b, a != b);
    printf("%d > %d: %d\\n", a, b, a > b);
    
    // Logical operators
    printf("\\nLogical Operations:\\n");
    printf("(%d > 5) && (%d < 10): %d\\n", a, b, (a > 5) && (b < 10));
    printf("(%d > 5) || (%d > 10): %d\\n", a, b, (a > 5) || (b > 10));
    printf("!(%d == 10): %d\\n", a, !(a == 10));
    
    // Assignment operators
    printf("\\nAssignment Operations:\\n");
    int c = a;  // Simple assignment
    printf("c = %d\\n", c);
    c += b;     // Compound assignment
    printf("c += %d: %d\\n", b, c);
    
    // Increment/Decrement
    printf("\\nIncrement/Decrement:\\n");
    printf("a = %d\\n", a);
    printf("a++: %d\\n", a++);
    printf("++a: %d\\n", ++a);
    
    return 0;
}`,
        "language": "c",
        "exercise": "Create a calculator program that performs all basic arithmetic operations based on user input."
      },
      {
        "id": "conditional-statements",
        "title": "Conditional Statements",
        "content": `
          <h3>Decision Making in C</h3>
          <p>Learn how to control program flow using conditional statements.</p>
          
          <h4>Conditional Structures:</h4>
          <ul>
            <li><strong>if statement:</strong> Basic conditional execution</li>
            <li><strong>if-else statement:</strong> Alternative execution paths</li>
            <li><strong>else-if ladder:</strong> Multiple condition checking</li>
            <li><strong>switch statement:</strong> Multi-way branching</li>
            <li><strong>Ternary operator:</strong> Compact conditional expression</li>
          </ul>
        `,
        "code": `#include <stdio.h>

int main() {
    int number;
    
    printf("Enter a number: ");
    scanf("%d", &number);
    
    // Simple if statement
    if (number > 0) {
        printf("%d is positive.\\n", number);
    }
    
    // if-else statement
    if (number % 2 == 0) {
        printf("%d is even.\\n", number);
    } else {
        printf("%d is odd.\\n", number);
    }
    
    // else-if ladder
    printf("Number category: ");
    if (number < 0) {
        printf("Negative\\n");
    } else if (number == 0) {
        printf("Zero\\n");
    } else if (number <= 10) {
        printf("Small positive\\n");
    } else if (number <= 100) {
        printf("Medium positive\\n");
    } else {
        printf("Large positive\\n");
    }
    
    // Switch statement
    int choice;
    printf("\\nMenu:\\n");
    printf("1. Check if prime\\n");
    printf("2. Check if perfect square\\n");
    printf("3. Exit\\n");
    printf("Enter your choice (1-3): ");
    scanf("%d", &choice);
    
    switch (choice) {
        case 1:
            // Simple prime check (not comprehensive)
            if (number <= 1) {
                printf("%d is not prime.\\n", number);
            } else if (number <= 3) {
                printf("%d is prime.\\n", number);
            } else if (number % 2 == 0 || number % 3 == 0) {
                printf("%d is not prime.\\n", number);
            } else {
                printf("%d might be prime (basic check).\\n", number);
            }
            break;
            
        case 2:
            // Perfect square check
            int i;
            for (i = 1; i * i <= number; i++) {
                if (i * i == number) {
                    printf("%d is a perfect square (%d^2).\\n", number, i);
                    break;
                }
            }
            if (i * i > number) {
                printf("%d is not a perfect square.\\n", number);
            }
            break;
            
        case 3:
            printf("Goodbye!\\n");
            break;
            
        default:
            printf("Invalid choice!\\n");
    }
    
    // Ternary operator
    int absValue = (number < 0) ? -number : number;
    printf("Absolute value: %d\\n", absValue);
    
    return 0;
}`,
        "language": "c",
        "exercise": "Create a grading system that takes marks as input and outputs the grade (A, B, C, D, F)."
      },
      {
        "id": "loops",
        "title": "Loop Control Statements",
        "content": `
          <h3>Repetition and Iteration in C</h3>
          <p>Learn how to execute code repeatedly using loop structures.</p>
          
          <h4>Loop Types:</h4>
          <ul>
            <li><strong>for loop:</strong> Counter-controlled repetition</li>
            <li><strong>while loop:</strong> Condition-controlled repetition</li>
            <li><strong>do-while loop:</strong> Condition-checked after execution</li>
            <li><strong>Nested loops:</strong> Loops within loops</li>
            <li><strong>Control statements:</strong> break, continue, goto</li>
          </ul>
        `,
        "code": `#include <stdio.h>

int main() {
    int i, j;
    
    printf("=== FOR LOOP EXAMPLES ===\\n");
    
    // Basic for loop
    printf("Counting 1 to 5: ");
    for (i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\\n");
    
    // Reverse counting
    printf("Counting 5 to 1: ");
    for (i = 5; i >= 1; i--) {
        printf("%d ", i);
    }
    printf("\\n");
    
    printf("\\n=== WHILE LOOP EXAMPLES ===\\n");
    
    // While loop
    int sum = 0, count = 1;
    while (count <= 10) {
        sum += count;
        count++;
    }
    printf("Sum of 1 to 10: %d\\n", sum);
    
    printf("\\n=== DO-WHILE LOOP EXAMPLES ===\\n");
    
    // Do-while loop (executes at least once)
    int number;
    do {
        printf("Enter a positive number: ");
        scanf("%d", &number);
    } while (number <= 0);
    printf("You entered: %d\\n", number);
    
    printf("\\n=== NESTED LOOPS ===\\n");
    
    // Nested loops for multiplication table
    printf("Multiplication Table (1-5):\\n");
    for (i = 1; i <= 5; i++) {
        for (j = 1; j <= 5; j++) {
            printf("%d\\t", i * j);
        }
        printf("\\n");
    }
    
    printf("\\n=== LOOP CONTROL STATEMENTS ===\\n");
    
    // break example
    printf("Numbers from 1 to 10 (stop at 7): ");
    for (i = 1; i <= 10; i++) {
        if (i == 7) {
            break;
        }
        printf("%d ", i);
    }
    printf("\\n");
    
    // continue example
    printf("Odd numbers from 1 to 10: ");
    for (i = 1; i <= 10; i++) {
        if (i % 2 == 0) {
            continue;
        }
        printf("%d ", i);
    }
    printf("\\n");
    
    // goto example (use sparingly)
    i = 1;
    printf("Using goto for loop: ");
    loop_start:
    if (i <= 5) {
        printf("%d ", i);
        i++;
        goto loop_start;
    }
    printf("\\n");
    
    return 0;
}`,
        "language": "c",
        "exercise": "Create a program that prints all prime numbers between 1 and 100 using loops."
      },
      {
        "id": "functions-recursion",
        "title": "Functions & Recursion",
        "content": `
          <h3>Modular Programming with Functions</h3>
          <p>Learn to create reusable code blocks and understand recursive problem-solving.</p>
          
          <h4>Function Concepts:</h4>
          <ul>
            <li><strong>Function declaration and definition</strong></li>
            <li><strong>Parameters and return values</strong></li>
            <li><strong>Call by value vs call by reference</strong></li>
            <li><strong>Recursive functions</strong></li>
            <li><strong>Function prototypes</strong></li>
            <li><strong>Scope and lifetime of variables</strong></li>
          </ul>
        `,
        "code": `#include <stdio.h>

// Function prototypes
int add(int a, int b);
void printMessage(char message[]);
int factorial(int n);
int fibonacci(int n);
void swap(int *a, int *b);

int main() {
    printf("=== BASIC FUNCTIONS ===\\n");
    
    // Calling simple functions
    int result = add(5, 3);
    printf("5 + 3 = %d\\n", result);
    
    printMessage("Hello from function!");
    
    printf("\\n=== RECURSIVE FUNCTIONS ===\\n");
    
    // Factorial using recursion
    int num = 5;
    printf("Factorial of %d: %d\\n", num, factorial(num));
    
    // Fibonacci series using recursion
    printf("Fibonacci series up to 10 terms: ");
    for (int i = 0; i < 10; i++) {
        printf("%d ", fibonacci(i));
    }
    printf("\\n");
    
    printf("\\n=== CALL BY REFERENCE ===\\n");
    
    // Demonstrating call by reference
    int x = 10, y = 20;
    printf("Before swap: x = %d, y = %d\\n", x, y);
    swap(&x, &y);
    printf("After swap: x = %d, y = %d\\n", x, y);
    
    return 0;
}

// Function definitions

// Simple function with return value
int add(int a, int b) {
    return a + b;
}

// Function without return value
void printMessage(char message[]) {
    printf("Message: %s\\n", message);
}

// Recursive factorial function
int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

// Recursive Fibonacci function
int fibonacci(int n) {
    if (n == 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Function using call by reference
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}`,
        "language": "c",
        "exercise": "Create a recursive function to calculate the GCD (Greatest Common Divisor) of two numbers."
      },
      {
        "id": "pointers",
        "title": "Pointers",
        "content": `
          <h3>Understanding Pointers in C</h3>
          <p>Master the powerful concept of pointers for direct memory manipulation.</p>
          
          <h4>Pointer Concepts:</h4>
          <ul>
            <li><strong>Pointer declaration and initialization</strong></li>
            <li><strong>Address-of (&) and dereference (*) operators</strong></li>
            <li><strong>Pointer arithmetic</strong></li>
            <li><strong>Pointers and arrays</strong></li>
            <li><strong>Pointers to pointers</strong></li>
            <li><strong>Function pointers</strong></li>
            <li><strong>Dynamic memory allocation</strong></li>
          </ul>
        `,
        "code": `#include <stdio.h>

int main() {
    printf("=== BASIC POINTER OPERATIONS ===\\n");
    
    int num = 42;
    int *ptr = &num;  // Pointer to integer
    
    printf("Value of num: %d\\n", num);
    printf("Address of num: %p\\n", &num);
    printf("Value of ptr: %p\\n", ptr);
    printf("Value pointed by ptr: %d\\n", *ptr);
    
    printf("\\n=== POINTER ARITHMETIC ===\\n");
    
    int arr[] = {10, 20, 30, 40, 50};
    int *arrPtr = arr;  // Points to first element
    
    printf("Array elements using pointers:\\n");
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d, *(arrPtr + %d) = %d\\n", 
               i, arr[i], i, *(arrPtr + i));
    }
    
    printf("\\n=== POINTERS AND FUNCTIONS ===\\n");
    
    int a = 5, b = 10;
    printf("Before function call: a = %d, b = %d\\n", a, b);
    
    // Function that modifies variables using pointers
    void modifyValues(int *x, int *y) {
        *x = *x * 2;
        *y = *y * 3;
    }
    
    modifyValues(&a, &b);
    printf("After function call: a = %d, b = %d\\n", a, b);
    
    printf("\\n=== POINTER TO POINTER ===\\n");
    
    int value = 100;
    int *ptr1 = &value;
    int **ptr2 = &ptr1;  // Pointer to pointer
    
    printf("Value: %d\\n", value);
    printf("Value via ptr1: %d\\n", *ptr1);
    printf("Value via ptr2: %d\\n", **ptr2);
    
    printf("\\n=== FUNCTION POINTERS ===\\n");
    
    // Function pointer declaration
    int (*operation)(int, int);
    
    // Define operations
    int add(int x, int y) { return x + y; }
    int multiply(int x, int y) { return x * y; }
    
    // Use function pointer
    operation = add;
    printf("5 + 3 = %d\\n", operation(5, 3));
    
    operation = multiply;
    printf("5 * 3 = %d\\n", operation(5, 3));
    
    return 0;
}`,
        "language": "c",
        "exercise": "Create a program that uses pointers to reverse an array without creating a new array."
      },
      {
        "id": "arrays",
        "title": "Arrays",
        "content": `
          <h3>Working with Arrays in C</h3>
          <p>Learn to store and manipulate collections of data using arrays.</p>
          
          <h4>Array Concepts:</h4>
          <ul>
            <li><strong>Single-dimensional arrays</strong></li>
            <li><strong>Multi-dimensional arrays</strong></li>
            <li><strong>Array initialization and access</strong></li>
            <li><strong>Arrays and pointers relationship</strong></li>
            <li><strong>Passing arrays to functions</strong></li>
            <li><strong>Array operations: sorting, searching</strong></li>
          </ul>
        `,
        "code": `#include <stdio.h>

// Function prototypes
void printArray(int arr[], int size);
void bubbleSort(int arr[], int size);
int binarySearch(int arr[], int size, int key);

int main() {
    printf("=== SINGLE-DIMENSIONAL ARRAYS ===\\n");
    
    // Array declaration and initialization
    int numbers[5] = {5, 2, 8, 1, 9};
    int size = 5;
    
    printf("Original array: ");
    printArray(numbers, size);
    
    // Array operations
    printf("\\n=== ARRAY OPERATIONS ===\\n");
    
    // Sorting
    bubbleSort(numbers, size);
    printf("Sorted array: ");
    printArray(numbers, size);
    
    // Searching
    int key = 8;
    int index = binarySearch(numbers, size, key);
    if (index != -1) {
        printf("Element %d found at index %d\\n", key, index);
    } else {
        printf("Element %d not found\\n", key);
    }
    
    printf("\\n=== MULTI-DIMENSIONAL ARRAYS ===\\n");
    
    // 2D array (matrix)
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    
    printf("2D Array (Matrix):\\n");
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }
    
    // Matrix multiplication
    printf("\\n=== MATRIX OPERATIONS ===\\n");
    
    int A[2][2] = {{1, 2}, {3, 4}};
    int B[2][2] = {{5, 6}, {7, 8}};
    int C[2][2] = {{0, 0}, {0, 0}};
    
    // Matrix multiplication
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            for (int k = 0; k < 2; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    
    printf("Matrix multiplication result:\\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            printf("%d ", C[i][j]);
        }
        printf("\\n");
    }
    
    return 0;
}

// Function to print array
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

// Bubble sort algorithm
void bubbleSort(int arr[], int size) {
    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

// Binary search algorithm (requires sorted array)
int binarySearch(int arr[], int size, int key) {
    int low = 0, high = size - 1;
    
    while (low <= high) {
        int mid = low + (high - low) / 2;
        
        if (arr[mid] == key) {
            return mid;
        } else if (arr[mid] < key) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    
    return -1;  // Not found
}`,
        "language": "c",
        "exercise": "Create a program that finds the second largest element in an array without sorting."
      },
      {
        "id": "strings",
        "title": "Strings",
        "content": `
          <h3>String Manipulation in C</h3>
          <p>Learn to work with strings as character arrays and use string handling functions.</p>
          
          <h4>String Concepts:</h4>
          <ul>
            <li><strong>String declaration and initialization</strong></li>
            <li><strong>String input/output functions</strong></li>
            <li><strong>String manipulation functions</strong></li>
            <li><strong>Character arrays vs string literals</strong></li>
            <li><strong>String comparison and searching</strong></li>
            <li><strong>Common string operations</strong></li>
          </ul>
        `,
        "code": `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main() {
    printf("=== STRING DECLARATION AND INITIALIZATION ===\\n");
    
    // Different ways to declare strings
    char str1[] = "Hello, World!";  // Automatic size calculation
    char str2[20] = "C Programming"; // Fixed size
    char str3[50];                   // Uninitialized
    
    printf("str1: %s\\n", str1);
    printf("str2: %s\\n", str2);
    
    printf("\\n=== STRING INPUT/OUTPUT ===\\n");
    
    // String input
    printf("Enter your name: ");
    fgets(str3, sizeof(str3), stdin);
    
    // Remove newline character if present
    str3[strcspn(str3, "\\n")] = 0;
    
    printf("Hello, %s!\\n", str3);
    
    printf("\\n=== STRING LENGTH ===\\n");
    
    printf("Length of str1: %lu\\n", strlen(str1));
    printf("Length of your name: %lu\\n", strlen(str3));
    
    printf("\\n=== STRING COPY AND CONCATENATION ===\\n");
    
    char copy[50];
    strcpy(copy, str1);  // String copy
    printf("Copied string: %s\\n", copy);
    
    strcat(copy, " Welcome!");  // String concatenation
    printf("After concatenation: %s\\n", copy);
    
    printf("\\n=== STRING COMPARISON ===\\n");
    
    char password[] = "secret123";
    char userInput[50];
    
    printf("Enter password: ");
    scanf("%s", userInput);
    
    if (strcmp(password, userInput) == 0) {
        printf("Access granted!\\n");
    } else {
        printf("Access denied!\\n");
    }
    
    printf("\\n=== STRING SEARCHING ===\\n");
    
    char text[] = "The quick brown fox jumps over the lazy dog";
    char search[] = "fox";
    
    char *result = strstr(text, search);
    if (result != NULL) {
        printf("'%s' found at position %ld\\n", search, result - text);
    } else {
        printf("'%s' not found\\n", search);
    }
    
    printf("\\n=== CHARACTER MANIPULATION ===\\n");
    
    char mixed[] = "Hello World 123!";
    printf("Original: %s\\n", mixed);
    
    // Convert to uppercase
    for (int i = 0; mixed[i]; i++) {
        mixed[i] = toupper(mixed[i]);
    }
    printf("Uppercase: %s\\n", mixed);
    
    // Convert to lowercase
    for (int i = 0; mixed[i]; i++) {
        mixed[i] = tolower(mixed[i]);
    }
    printf("Lowercase: %s\\n", mixed);
    
    printf("\\n=== TOKENIZATION ===\\n");
    
    char sentence[] = "This is a sample sentence";
    char *token = strtok(sentence, " ");
    
    printf("Tokens: ");
    while (token != NULL) {
        printf("[%s] ", token);
        token = strtok(NULL, " ");
    }
    printf("\\n");
    
    return 0;
}`,
        "language": "c",
        "exercise": "Create a program that checks if a string is a palindrome (reads same forwards and backwards)."
      },
      {
        "id": "structures",
        "title": "Structures",
        "content": `
          <h3>Working with Structures in C</h3>
          <p>Learn to create custom data types using structures for complex data organization.</p>
          
          <h4>Structure Concepts:</h4>
          <ul>
            <li><strong>Structure declaration and definition</strong></li>
            <li><strong>Structure variable declaration</strong></li>
            <li><strong>Accessing structure members</strong></li>
            <li><strong>Arrays of structures</strong></li>
            <li><strong>Nested structures</strong></li>
            <li><strong>Structures and functions</strong></li>
            <li><strong>Unions and their differences</strong></li>
          </ul>
        `,
        "code": `#include <stdio.h>
#include <string.h>

// Structure declaration
struct Student {
    int rollNumber;
    char name[50];
    float marks;
    char grade;
};

// Nested structure
struct Address {
    char street[50];
    char city[30];
    int zipCode;
};

struct Employee {
    int id;
    char name[50];
    struct Address address;  // Nested structure
    float salary;
};

// Union demonstration
union Data {
    int i;
    float f;
    char str[20];
};

int main() {
    printf("=== BASIC STRUCTURE USAGE ===\\n");
    
    // Structure variable declaration and initialization
    struct Student student1 = {101, "Alice Johnson", 85.5, 'A'};
    
    // Accessing structure members
    printf("Student Information:\\n");
    printf("Roll Number: %d\\n", student1.rollNumber);
    printf("Name: %s\\n", student1.name);
    printf("Marks: %.2f\\n", student1.marks);
    printf("Grade: %c\\n", student1.grade);
    
    printf("\\n=== ARRAY OF STRUCTURES ===\\n");
    
    struct Student class[3] = {
        {102, "Bob Smith", 78.0, 'B'},
        {103, "Carol Davis", 92.5, 'A'},
        {104, "David Wilson", 65.5, 'C'}
    };
    
    printf("Class Information:\\n");
    for (int i = 0; i < 3; i++) {
        printf("Student %d: %s (Roll: %d, Marks: %.2f, Grade: %c)\\n",
               i + 1, class[i].name, class[i].rollNumber,
               class[i].marks, class[i].grade);
    }
    
    printf("\\n=== NESTED STRUCTURES ===\\n");
    
    struct Employee emp1 = {
        1001,
        "John Doe",
        {"123 Main St", "Springfield", 12345},
        50000.0
    };
    
    printf("Employee Information:\\n");
    printf("ID: %d\\n", emp1.id);
    printf("Name: %s\\n", emp1.name);
    printf("Address: %s, %s - %d\\n",
           emp1.address.street, emp1.address.city, emp1.address.zipCode);
    printf("Salary: $%.2f\\n", emp1.salary);
    
    printf("\\n=== STRUCTURES AND FUNCTIONS ===\\n");
    
    // Function to display student information
    void displayStudent(struct Student s) {
        printf("Roll: %d, Name: %s, Marks: %.2f, Grade: %c\\n",
               s.rollNumber, s.name, s.marks, s.grade);
    }
    
    // Function to modify student marks (using pointer)
    void updateMarks(struct Student *s, float newMarks) {
        s->marks = newMarks;
        // Update grade based on marks
        if (newMarks >= 90) s->grade = 'A';
        else if (newMarks >= 80) s->grade = 'B';
        else if (newMarks >= 70) s->grade = 'C';
        else if (newMarks >= 60) s->grade = 'D';
        else s->grade = 'F';
    }
    
    printf("Before update: ");
    displayStudent(student1);
    
    updateMarks(&student1, 95.0);
    
    printf("After update: ");
    displayStudent(student1);
    
    printf("\\n=== UNIONS ===\\n");
    
    union Data data;
    
    data.i = 10;
    printf("data.i = %d\\n", data.i);
    
    data.f = 3.14;
    printf("data.f = %.2f\\n", data.f);
    
    strcpy(data.str, "Hello");
    printf("data.str = %s\\n", data.str);
    
    // Demonstrating that union shares memory
    printf("\\nUnion memory sharing demonstration:\\n");
    printf("Size of union: %lu bytes\\n", sizeof(data));
    printf("Size of int: %lu bytes\\n", sizeof(int));
    printf("Size of float: %lu bytes\\n", sizeof(float));
    printf("Size of char[20]: %lu bytes\\n", sizeof(char[20]));
    
    return 0;
}`,
        "language": "c",
        "exercise": "Create a library management system using structures to store book information (title, author, ISBN, price)."
      },
      {
        "id": "file-io",
        "title": "File I/O",
        "content": `
          <h3>File Input/Output Operations in C</h3>
          <p>Learn to read from and write to files for persistent data storage.</p>
          
          <h4>File I/O Concepts:</h4>
          <ul>
            <li><strong>File opening modes</strong></li>
            <li><strong>Reading and writing text files</strong></li>
            <li><strong>Binary file operations</strong></li>
            <li><strong>File positioning functions</strong></li>
            <li><strong>Error handling in file operations</strong></li>
            <li><strong>Working with file streams</strong></li>
          </ul>
        `,
        "code": `#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *file;
    char filename[50];
    char content[1000];
    
    printf("=== TEXT FILE WRITING ===\\n");
    
    printf("Enter filename to create: ");
    scanf("%s", filename);
    
    // Create and write to file
    file = fopen(filename, "w");
    
    if (file == NULL) {
        printf("Error creating file!\\n");
        return 1;
    }
    
    printf("Enter content to write (end with empty line):\\n");
    getchar();  // Clear input buffer
    
    while (fgets(content, sizeof(content), stdin) != NULL) {
        if (content[0] == '\\n') break;  // Stop on empty line
        fputs(content, file);
    }
    
    fclose(file);
    printf("File written successfully!\\n");
    
    printf("\\n=== TEXT FILE READING ===\\n");
    
    file = fopen(filename, "r");
    
    if (file == NULL) {
        printf("Error opening file for reading!\\n");
        return 1;
    }
    
    printf("File content:\\n");
    printf("=============\\n");
    
    char ch;
    while ((ch = fgetc(file)) != EOF) {
        putchar(ch);
    }
    
    fclose(file);
    
    printf("\\n=== BINARY FILE OPERATIONS ===\\n");
    
    struct Student {
        int id;
        char name[50];
        float grade;
    };
    
    struct Student students[3] = {
        {1, "Alice", 85.5},
        {2, "Bob", 78.0},
        {3, "Carol", 92.5}
    };
    
    // Write structures to binary file
    file = fopen("students.dat", "wb");
    
    if (file == NULL) {
        printf("Error creating binary file!\\n");
        return 1;
    }
    
    fwrite(students, sizeof(struct Student), 3, file);
    fclose(file);
    printf("Binary file written successfully!\\n");
    
    // Read from binary file
    file = fopen("students.dat", "rb");
    
    if (file == NULL) {
        printf("Error opening binary file!\\n");
        return 1;
    }
    
    struct Student readStudents[3];
    fread(readStudents, sizeof(struct Student), 3, file);
    
    printf("\\nStudents from binary file:\\n");
    for (int i = 0; i < 3; i++) {
        printf("ID: %d, Name: %s, Grade: %.2f\\n",
               readStudents[i].id, readStudents[i].name, readStudents[i].grade);
    }
    
    fclose(file);
    
    printf("\\n=== FILE POSITIONING ===\\n");
    
    file = fopen("students.dat", "rb");
    
    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }
    
    // Move to second student record
    fseek(file, sizeof(struct Student), SEEK_SET);
    
    struct Student secondStudent;
    fread(&secondStudent, sizeof(struct Student), 1, file);
    
    printf("Second student: %s (ID: %d)\\n", secondStudent.name, secondStudent.id);
    
    // Get current position
    long position = ftell(file);
    printf("Current file position: %ld\\n", position);
    
    // Go back to beginning
    rewind(file);
    position = ftell(file);
    printf("Position after rewind: %ld\\n", position);
    
    fclose(file);
    
    printf("\\n=== ERROR HANDLING ===\\n");
    
    file = fopen("nonexistent.txt", "r");
    
    if (file == NULL) {
        perror("Error opening file");
        printf("Error code: %d\\n", errno);
    }
    
    return 0;
}`,
        "language": "c",
        "exercise": "Create a student record system that stores and retrieves student data from a file."
      },
    ]
  },
      
  'cpp-programming': {
    "title": "Complete C++ Programming Course",
    "description": "Master C++ programming from fundamentals to advanced concepts with practical examples",
    "totalTopics": 65,
    "topics": [
      {
        "id": "course-introduction",
        "title": "Course Introduction",
        "content": `
          <h3>Welcome to C++ Programming!</h3>
          <p>C++ is a powerful, high-performance programming language used for system software, game development, and high-performance applications.</p>
          
          <h4>What You'll Learn:</h4>
          <ul>
            <li>C++ syntax and fundamental concepts</li>
            <li>Object-Oriented Programming (OOP)</li>
            <li>Standard Template Library (STL)</li>
            <li>Memory management and pointers</li>
            <li>Modern C++ features (C++11/14/17/20)</li>
          </ul>
          
          <h4>Why Learn C++?</h4>
          <ul>
            <li>High performance and efficiency</li>
            <li>Used in game development, embedded systems, and high-frequency trading</li>
            <li>Foundation for understanding computer systems</li>
            <li>Strong job market demand</li>
          </ul>
        `,
        "code": `// Your first C++ program
#include <iostream>
using namespace std;

int main() {
    cout << "Welcome to C++ Programming!" << endl;
    cout << "Let's start our journey to become C++ experts!" << endl;
    return 0;
}`,
        "language": "cpp",
        "exercise": "Write a program that prints a personalized welcome message."
      },
      {
        "id": "introduction-cpp",
        "title": "Introduction to C++",
        "content": `
          <h3>What is C++?</h3>
          <p>C++ is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C language.</p>
          
          <h4>Key Features:</h4>
          <ul>
            <li>Object-Oriented Programming support</li>
            <li>Template programming</li>
            <li>Direct memory manipulation</li>
            <li>High performance</li>
            <li>Cross-platform development</li>
          </ul>
          
          <h4>C++ vs C:</h4>
          <ul>
            <li>C++ includes all C features plus OOP</li>
            <li>Stronger type checking</li>
            <li>Standard Template Library (STL)</li>
            <li>Exception handling</li>
          </ul>
        `,
        "code": `#include <iostream>
#include <string>
using namespace std;

// Simple class demonstration
class Greeter {
private:
    string name;
    
public:
    Greeter(string n) : name(n) {}
    
    void greet() {
        cout << "Hello, " << name << "! Welcome to C++." << endl;
    }
};

int main() {
    cout << "=== Introduction to C++ ===" << endl;
    cout << "C++ combines procedural and object-oriented programming." << endl;
    
    // Object-oriented approach
    Greeter greeter("Learner");
    greeter.greet();
    
    // Procedural approach
    int numbers[] = {1, 2, 3, 4, 5};
    int sum = 0;
    
    for (int i = 0; i < 5; i++) {
        sum += numbers[i];
    }
    
    cout << "Sum of numbers: " << sum << endl;
    cout << "Average: " << static_cast<double>(sum) / 5 << endl;
    
    return 0;
}`,
        "language": "cpp",
        "exercise": "Create a program that demonstrates both procedural and object-oriented approaches."
      },
      {
        "id": "popular-ides",
        "title": "Popular IDEs",
        "content": `
          <h3>Choosing Your C++ Development Environment</h3>
          <p>Select the right Integrated Development Environment (IDE) for your C++ projects.</p>
          
          <h4>Popular C++ IDEs:</h4>
          <ul>
            <li><strong>Visual Studio:</strong> Microsoft's powerful IDE with excellent debugging</li>
            <li><strong>CLion:</strong> JetBrains' cross-platform C++ IDE</li>
            <li><strong>Code::Blocks:</strong> Free, open-source, cross-platform IDE</li>
            <li><strong>Eclipse CDT:</strong> Eclipse with C++ development tools</li>
            <li><strong>Qt Creator:</strong> Great for GUI applications</li>
            <li><strong>VS Code:</strong> Lightweight editor with C++ extensions</li>
          </ul>
          
          <h4>Setting Up VS Code for C++:</h4>
          <ol>
            <li>Install Visual Studio Code</li>
            <li>Install C/C++ extension by Microsoft</li>
            <li>Install a C++ compiler (GCC/MinGW or MSVC)</li>
            <li>Configure build tasks</li>
            <li>Set up debugging</li>
          </ol>
        `,
        "code": `/*
 * This program tests your IDE setup
 * Compile and run to verify everything works
 */

#include <iostream>
#include <vector>
#include <string>

using namespace std;

class IDETest {
public:
    void testFeatures() {
        cout << "=== IDE Feature Test ===" << endl;
        
        // Test modern C++ features
        vector<string> features = {
            "Syntax highlighting",
            "Auto-completion", 
            "Debugging",
            "Code navigation",
            "Build automation"
        };
        
        for (const auto& feature : features) {
            cout << "✓ " << feature << endl;
        }
        
        // Test compilation
        int result = calculate(10, 5);
        cout << "Calculation test: 10 * 5 = " << result << endl;
        
        // Test debugging (set breakpoint here)
        debugTest();
    }
    
private:
    int calculate(int a, int b) {
        return a * b;
    }
    
    void debugTest() {
        int x = 42;
        string message = "Debugging works!";
        cout << message << " Value: " << x << endl;
    }
};

int main() {
    IDETest test;
    test.testFeatures();
    
    cout << "\\n🎉 Your IDE is set up correctly!" << endl;
    return 0;
}`,
        "language": "cpp",
        "exercise": "Set up your chosen IDE and run this verification program."
      },
      {
        "id": "first-cpp-program",
        "title": "Your First C++ Program",
        "content": `
          <h3>Writing and Understanding Your First C++ Program</h3>
          <p>Learn the basic structure of a C++ program and how to compile and run it.</p>
          
          <h4>Program Structure:</h4>
          <ul>
            <li><strong>#include directives:</strong> Header files</li>
            <li><strong>using namespace std:</strong> Standard namespace</li>
            <li><strong>main() function:</strong> Program entry point</li>
            <li><strong>cout:</strong> Output stream</li>
            <li><strong>return 0:</strong> Program exit status</li>
          </ul>
        `,
        "code": `// First C++ Program - Hello World
#include <iostream>   // Input/output stream header
using namespace std; // Use standard namespace

// Main function - program entry point
int main() {
    // Display output to console
    cout << "=== My First C++ Program ===" << endl;
    cout << "Hello, World!" << endl;
    cout << "C++ is powerful and flexible!" << endl;
    
    // Basic calculations
    int number1 = 15;
    int number2 = 25;
    int sum = number1 + number2;
    
    cout << "The sum of " << number1 << " and " << number2 
         << " is: " << sum << endl;
    
    // Working with different data types
    double pi = 3.14159;
    char grade = 'A';
    string message = "Learning C++ is fun!";
    bool isCppAwesome = true;
    
    cout << "Pi value: " << pi << endl;
    cout << "Grade: " << grade << endl;
    cout << "Message: " << message << endl;
    cout << "Is C++ awesome? " << (isCppAwesome ? "Yes!" : "No") << endl;
    
    // Program successfully completed
    return 0;
}`,
        "language": "cpp",
        "exercise": "Create a program that introduces yourself with name, age, and programming experience."
      },
      {
        "id": "compiling-running",
        "title": "Compiling and Running a C++ Program",
        "content": `
          <h3>The C++ Build Process</h3>
          <p>Understand how C++ source code is transformed into an executable program.</p>
          
          <h4>Compilation Steps:</h4>
          <ol>
            <li><strong>Preprocessing:</strong> Handles #include and #define directives</li>
            <li><strong>Compilation:</strong> Converts source code to assembly</li>
            <li><strong>Assembly:</strong> Converts assembly to machine code (object files)</li>
            <li><strong>Linking:</strong> Combines object files into executable</li>
          </ol>
          
          <h4>Compilation Methods:</h4>
          <ul>
            <li><strong>Command Line:</strong> g++ program.cpp -o program</li>
            <li><strong>IDE Build:</strong> Click build/run button</li>
            <li><strong>Build Systems:</strong> Make, CMake, Ninja</li>
          </ul>
        `,
        "code": `/*
 * Compilation Demonstration Program
 * Shows different compilation scenarios
 */

#include <iostream>
#include <cmath>    // Math functions
#include <vector>   // Vector container

using namespace std;

// Function declarations (prototypes)
double calculateCircleArea(double radius);
void demonstrateLinking();

int main() {
    cout << "=== Compilation and Linking Demo ===" << endl;
    
    // Demonstrate included libraries work
    double radius = 5.0;
    double area = calculateCircleArea(radius);
    
    cout << "Circle with radius " << radius << " has area: " << area << endl;
    
    // Demonstrate STL linking
    vector<int> numbers = {1, 2, 3, 4, 5};
    cout << "Vector contents: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    demonstrateLinking();
    
    // Compile-time calculation demonstration
    const int compileTimeValue = 10 * 5;
    cout << "Compile-time calculated value: " << compileTimeValue << endl;
    
    return 0;
}

// Function definition
double calculateCircleArea(double radius) {
    return M_PI * radius * radius;  // M_PI from cmath
}

void demonstrateLinking() {
    cout << "This function demonstrates successful linking." << endl;
    
    // Static vs dynamic linking demonstration
    string staticString = "This string uses static linking";
    cout << staticString << endl;
}

/*
 * Compilation commands:
 * 
 * Basic compilation:
 * g++ -o program compilation_demo.cpp
 * 
 * With optimization:
 * g++ -O2 -o program compilation_demo.cpp
 * 
 * With debugging info:
 * g++ -g -o program compilation_demo.cpp
 * 
 * With warnings:
 * g++ -Wall -Wextra -o program compilation_demo.cpp
 */`,
        "language": "cpp",
        "exercise": "Compile this program using different compiler flags and observe the differences."
      },
      {
        "id": "changing-theme",
        "title": "Changing the Theme",
        "content": `
          <h3>Customizing Your Development Environment</h3>
          <p>Learn how to personalize your IDE theme and settings for better productivity.</p>
          
          <h4>Popular IDE Themes:</h4>
          <ul>
            <li><strong>Dark Theme:</strong> Easy on eyes, reduces eye strain</li>
            <li><strong>Light Theme:</strong> Traditional, good for well-lit environments</li>
            <li><strong>High Contrast:</strong> Accessibility-focused</li>
            <li><strong>Colorblind-Friendly:</strong> Designed for color vision deficiency</li>
          </ul>
          
          <h4>VS Code Theme Installation:</h4>
          <ol>
            <li>Open Extensions panel (Ctrl+Shift+X)</li>
            <li>Search for "theme"</li>
            <li>Install preferred theme</li>
            <li>Go to Settings > Color Theme</li>
            <li>Select your theme</li>
          </ol>
        `,
        "code": `/*
 * Theme-Friendly Code Example
 * Well-formatted code that looks good in any theme
 */

#include <iostream>
#include <string>
#include <iomanip>  // For formatting

// Clear class structure with good formatting
class ThemeDemo {
private:
    std::string themeName;
    bool isDarkMode;
    int fontSize;

public:
    // Constructor with initializer list
    ThemeDemo(std::string name, bool dark, int size) 
        : themeName(name), isDarkMode(dark), fontSize(size) {}
    
    // Method to display theme info
    void displayThemeInfo() {
        std::cout << "=== IDE Theme Information ===" << std::endl;
        std::cout << std::left << std::setw(15) << "Theme Name:" << themeName << std::endl;
        std::cout << std::setw(15) << "Dark Mode:" << (isDarkMode ? "Yes" : "No") << std::endl;
        std::cout << std::setw(15) << "Font Size:" << fontSize << "px" << std::endl;
    }
    
    // Method to check readability
    void checkReadability() {
        std::cout << "\\n=== Readability Check ===" << std::endl;
        
        if (fontSize < 12) {
            std::cout << "⚠️  Consider increasing font size for better readability" << std::endl;
        } else {
            std::cout << "✓ Font size is comfortable" << std::endl;
        }
        
        if (isDarkMode) {
            std::cout << "✓ Dark theme reduces eye strain" << std::endl;
        } else {
            std::cout << "✓ Light theme works in bright environments" << std::endl;
        }
    }
};

// Well-commented function
void demonstrateCodeFormatting() {
    // Clear variable names
    int meaningfulVariableName = 42;
    double calculationResult = 3.14159 * meaningfulVariableName;
    
    // Proper spacing and indentation
    for (int i = 0; i < 5; i++) {
        std::cout << "Iteration " << i << ": " << calculationResult << std::endl;
        calculationResult /= 2;  // Clear comment explaining operation
    }
}

int main() {
    // Create theme instances
    ThemeDemo darkTheme("One Dark Pro", true, 14);
    ThemeDemo lightTheme("Default Light", false, 12);
    
    // Demonstrate different themes
    darkTheme.displayThemeInfo();
    darkTheme.checkReadability();
    
    std::cout << std::endl;
    
    lightTheme.displayThemeInfo();
    lightTheme.checkReadability();
    
    // Show well-formatted code
    std::cout << "\\n=== Code Formatting Demo ===" << std::endl;
    demonstrateCodeFormatting();
    
    return 0;
}

/*
 * Tips for theme-friendly code:
 * - Use consistent indentation (spaces or tabs, but be consistent)
 * - Meaningful variable names
 * - Proper spacing around operators
 * - Clear comments
 * - Logical code organization
 */`,
        "language": "cpp",
        "exercise": "Customize your IDE theme and font settings, then write a program that demonstrates good coding style."
      },
      {
        "id": "course-structure",
        "title": "Course Structure",
        "content": `
          <h3>C++ Learning Roadmap</h3>
          <p>Follow this structured path to master C++ programming systematically.</p>
          
          <h4>Learning Modules:</h4>
          <ol>
            <li><strong>C++ Basics</strong> (2 weeks)
              <ul>
                <li>Syntax and basic concepts</li>
                <li>Variables and data types</li>
                <li>Control flow statements</li>
              </ul>
            </li>
            <li><strong>Object-Oriented Programming</strong> (3 weeks)
              <ul>
                <li>Classes and objects</li>
                <li>Inheritance and polymorphism</li>
                <li>Abstraction and interfaces</li>
              </ul>
            </li>
            <li><strong>Standard Template Library</strong> (2 weeks)
              <ul>
                <li>Containers (vector, list, map)</li>
                <li>Algorithms</li>
                <li>Iterators</li>
              </ul>
            </li>
            <li><strong>Advanced C++</strong> (3 weeks)
              <ul>
                <li>Memory management</li>
                <li>Templates</li>
                <li>Exception handling</li>
                <li>Modern C++ features</li>
              </ul>
            </li>
          </ol>
        `,
        "code": `/*
 * Course Structure Demonstration
 * Shows progressive learning from basics to advanced topics
 */

#include <iostream>
#include <vector>
#include <memory>  // Smart pointers

using namespace std;

namespace CourseStructure {
    
    // Week 1: Basic syntax and variables
    void week1Basics() {
        cout << "=== Week 1: Basic Syntax ===" << endl;
        int x = 10;
        double y = 3.14;
        cout << "x = " << x << ", y = " << y << endl;
    }
    
    // Week 2: Control structures and functions
    void week2ControlStructures() {
        cout << "\\n=== Week 2: Control Structures ===" << endl;
        for (int i = 1; i <= 5; i++) {
            if (i % 2 == 0) {
                cout << i << " is even" << endl;
            } else {
                cout << i << " is odd" << endl;
            }
        }
    }
    
    // Week 3-4: Introduction to OOP
    class Student {
    private:
        string name;
        int progressLevel;
        
    public:
        Student(string n) : name(n), progressLevel(1) {}
        
        void completeModule(string module) {
            progressLevel++;
            cout << name << " completed: " << module 
                 << " (Level: " << progressLevel << ")" << endl;
        }
    };
    
    // Week 5-6: Advanced OOP and STL
    template<typename T>
    class ProgressTracker {
    private:
        vector<T> completedItems;
        
    public:
        void addItem(const T& item) {
            completedItems.push_back(item);
            cout << "Added: " << item << endl;
        }
        
        void showProgress() {
            cout << "Total completed: " << completedItems.size() << endl;
        }
    };
    
    // Week 7-8: Modern C++ features
    class ModernFeatures {
    public:
        void demonstrate() {
            cout << "\\n=== Modern C++ Features ===" << endl;
            
            // Auto keyword
            auto number = 42;
            auto text = "Hello Modern C++";
            
            // Range-based for loop
            vector<int> numbers = {1, 2, 3, 4, 5};
            cout << "Numbers: ";
            for (const auto& num : numbers) {
                cout << num << " ";
            }
            cout << endl;
            
            // Smart pointers
            auto smartPtr = make_unique<string>("Memory management made easy");
            cout << *smartPtr << endl;
        }
    };
}

int main() {
    cout << "=== C++ Course Structure ===" << endl;
    
    // Demonstrate progressive learning
    CourseStructure::week1Basics();
    CourseStructure::week2ControlStructures();
    
    // OOP demonstration
    CourseStructure::Student student("Alice");
    student.completeModule("Basic Syntax");
    student.completeModule("OOP Fundamentals");
    
    // STL demonstration
    CourseStructure::ProgressTracker<string> tracker;
    tracker.addItem("Variables and Data Types");
    tracker.addItem("Functions");
    tracker.showProgress();
    
    // Modern features
    CourseStructure::ModernFeatures modern;
    modern.demonstrate();
    
    cout << "\\n🎯 Keep following the course structure!" << endl;
    return 0;
}`,
        "language": "cpp",
        "exercise": "Create a personal learning tracker that stores completed modules and calculates your progress percentage."
      },
      {
        "id": "cheat-sheet",
        "title": "Cheat Sheet",
        "content": `
          <h3>C++ Quick Reference Guide</h3>
          <p>Essential C++ syntax and concepts for quick reference.</p>
          
          <h4>Quick Reference Categories:</h4>
          <ul>
            <li>Basic Syntax and Structure</li>
            <li>Data Types and Variables</li>
            <li>Control Flow Statements</li>
            <li>Functions and Classes</li>
            <li>STL Containers and Algorithms</li>
            <li>Memory Management</li>
          </ul>
        `,
        "code": `/*
 * C++ Quick Reference Cheat Sheet
 * Essential syntax and examples
 */

#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <algorithm>
#include <memory>

using namespace std;

// 1. BASIC SYNTAX
void basicSyntax() {
    cout << "=== BASIC SYNTAX ===" << endl;
    
    // Variable declarations
    int number = 42;
    double pi = 3.14159;
    char grade = 'A';
    string name = "C++ Programmer";
    bool isValid = true;
    
    // Constants
    const int MAX_SIZE = 100;
    constexpr double COMPILE_TIME_CONST = 2.71828;
    
    // Output
    cout << "Number: " << number << endl;
    cout << "Name: " << name << endl;
}

// 2. CONTROL FLOW
void controlFlow() {
    cout << "\\n=== CONTROL FLOW ===" << endl;
    
    // If-else
    int score = 85;
    if (score >= 90) {
        cout << "Grade: A" << endl;
    } else if (score >= 80) {
        cout << "Grade: B" << endl;
    } else {
        cout << "Grade: C or below" << endl;
    }
    
    // Switch (C++17)
    string day = "Monday";
    switch (day[0]) {
        case 'M': cout << "Start of week" << endl; break;
        case 'F': cout << "Almost weekend!" << endl; break;
        default: cout << "Midweek" << endl;
    }
    
    // Loops
    for (int i = 0; i < 5; i++) {
        cout << "For loop: " << i << endl;
    }
    
    vector<int> numbers = {1, 2, 3, 4, 5};
    for (const auto& num : numbers) {
        cout << "Range-based: " << num << endl;
    }
}

// 3. FUNCTIONS
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; } // Overloading

void functionExamples() {
    cout << "\\n=== FUNCTIONS ===" << endl;
    cout << "5 + 3 = " << add(5, 3) << endl;
    cout << "2.5 + 3.7 = " << add(2.5, 3.7) << endl;
}

// 4. CLASSES AND OOP
class Person {
private:
    string name;
    int age;
    
public:
    // Constructor
    Person(string n, int a) : name(n), age(a) {}
    
    // Method
    void introduce() {
        cout << "Hello, I'm " << name << ", " << age << " years old." << endl;
    }
    
    // Getter
    string getName() const { return name; }
};

// 5. STL CONTAINERS
void stlContainers() {
    cout << "\\n=== STL CONTAINERS ===" << endl;
    
    // Vector
    vector<int> vec = {1, 2, 3, 4, 5};
    vec.push_back(6);
    
    // Map
    map<string, int> ageMap = {{"Alice", 25}, {"Bob", 30}};
    ageMap["Charlie"] = 28;
    
    // Algorithm
    auto it = find(vec.begin(), vec.end(), 3);
    if (it != vec.end()) {
        cout << "Found 3 in vector" << endl;
    }
}

// 6. MEMORY MANAGEMENT
void memoryManagement() {
    cout << "\\n=== MEMORY MANAGEMENT ===" << endl;
    
    // Smart pointers (modern C++)
    auto uniquePtr = make_unique<int>(42);
    auto sharedPtr = make_shared<string>("Shared ownership");
    
    cout << "Unique ptr: " << *uniquePtr << endl;
    cout << "Shared ptr: " << *sharedPtr << endl;
}

// 7. MODERN C++ FEATURES
void modernFeatures() {
    cout << "\\n=== MODERN C++ ===" << endl;
    
    // Auto type deduction
    auto x = 42;        // int
    auto y = 3.14;      // double
    auto z = "hello";   // const char*
    
    // Lambda expressions
    auto square = [](int n) { return n * n; };
    cout << "Square of 5: " << square(5) << endl;
    
    // Structured bindings (C++17)
    pair<string, int> person = {"Alice", 25};
    auto [name, age] = person;
    cout << name << " is " << age << " years old." << endl;
}

int main() {
    cout << "=== C++ QUICK REFERENCE ===" << endl;
    
    basicSyntax();
    controlFlow();
    functionExamples();
    
    // OOP example
    Person alice("Alice", 25);
    alice.introduce();
    
    stlContainers();
    memoryManagement();
    modernFeatures();
    
    cout << "\\n📚 Use this as a quick reference!" << endl;
    return 0;
}`,
        "language": "cpp",
        "exercise": "Create your own cheat sheet with examples of concepts you find most challenging."
      },
      {
        "id": "variables",
        "title": "Variables",
        "content": `
          <h3>Working with Variables in C++</h3>
          <p>Variables are named storage locations that hold data of specific types.</p>
          
          <h4>Variable Concepts:</h4>
          <ul>
            <li><strong>Declaration:</strong> Introducing a variable name</li>
            <li><strong>Definition:</strong> Allocating storage for variable</li>
            <li><strong>Initialization:</strong> Giving variable an initial value</li>
            <li><strong>Scope:</strong> Where variable is accessible</li>
            <li><strong>Lifetime:</strong> How long variable exists</li>
          </ul>
          
          <h4>Variable Types:</h4>
          <ul>
            <li><strong>Local variables:</strong> Inside functions/blocks</li>
            <li><strong>Global variables:</strong> Outside all functions</li>
            <li><strong>Static variables:</strong> Persist between function calls</li>
            <li><strong>Instance variables:</strong> Class member variables</li>
          </ul>
        `,
        "code": `#include <iostream>
#include <string>

using namespace std;

// Global variable (avoid when possible)
int globalCounter = 0;

class VariableDemo {
private:
    // Instance variables (member variables)
    string className;
    int instanceId;
    static int instanceCount;  // Static member variable

public:
    // Constructor
    VariableDemo(string name, int id) : className(name), instanceId(id) {
        instanceCount++;
        globalCounter++;
    }
    
    void demonstrateVariables() {
        // Local variables
        int localVar = 42;
        string localString = "Method local";
        
        // Const local variable
        const int MAX_ATTEMPTS = 3;
        
        cout << "=== Variable Demonstration ===" << endl;
        cout << "Local variable: " << localVar << endl;
        cout << "Local string: " << localString << endl;
        cout << "Const local: " << MAX_ATTEMPTS << endl;
        cout << "Instance ID: " << instanceId << endl;
        cout << "Instance count: " << instanceCount << endl;
        cout << "Global counter: " << globalCounter << endl;
    }
    
    void variableScopeDemo() {
        int x = 10;  // Method scope
        
        {
            int y = 20;  // Block scope - only accessible in this block
            cout << "Inside block - x: " << x << ", y: " << y << endl;
            
            // Shadowing demonstration
            string className = "Shadowed";  // Shadows instance variable
            cout << "Shadowed name: " << className << endl;
        }
        
        // y is not accessible here - out of scope
        // cout << y << endl;  // This would cause compilation error
        
        // Instance variable is accessible via 'this'
        cout << "Instance name: " << this->className << endl;
    }
    
    // Static member function
    static int getInstanceCount() {
        return instanceCount;
    }
};

// Static member definition
int VariableDemo::instanceCount = 0;

void demonstrateVariableLifetime() {
    cout << "\\n=== Variable Lifetime ===" << endl;
    
    // Automatic variables (created/destroyed automatically)
    for (int i = 0; i < 3; i++) {
        int loopVar = i * 10;  // Created each iteration
        static int staticVar = 0;  // Created once, persists
        
        staticVar++;
        cout << "Iteration " << i << ": loopVar=" << loopVar 
             << ", staticVar=" << staticVar << endl;
    }
}

int main() {
    cout << "=== C++ VARIABLES ===" << endl;
    
    // Demonstrate different variable types
    VariableDemo demo1("DemoClass", 1);
    VariableDemo demo2("AnotherClass", 2);
    
    demo1.demonstrateVariables();
    demo1.variableScopeDemo();
    
    cout << endl;
    
    demo2.demonstrateVariables();
    
    // Static variable demonstration
    demonstrateVariableLifetime();
    
    // Access static member
    cout << "\\nTotal instances created: " << VariableDemo::getInstanceCount() << endl;
    
    // Demonstrate variable sizes
    cout << "\\n=== Variable Sizes ===" << endl;
    cout << "Size of int: " << sizeof(int) << " bytes" << endl;
    cout << "Size of double: " << sizeof(double) << " bytes" << endl;
    cout << "Size of string: " << sizeof(string) << " bytes" << endl;
    cout << "Size of bool: " << sizeof(bool) << " bytes" << endl;
    
    return 0;
}`,
        "language": "cpp",
        "exercise": "Create a program that demonstrates variable scope, shadowing, and different storage durations."
      }
      // Continue with: constants, naming-conventions, mathematical-expressions, etc.
    ]
}
};
  
  

  const course = courseData[courseId || ''];

  useEffect(() => {
    if (course && user && !user.enrolledCourses.includes(courseId || '')) {
      enrollInCourse(courseId || '', course.title);
    }
  }, [course, user, courseId, enrollInCourse]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course not found</h2>
          <p className="text-gray-600">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const currentTopicData = course.topics[currentTopic];
  const progress = user ? ((user.progress[courseId || '']?.length || 0) / course.totalTopics) * 100 : 0;

  const handleMarkComplete = () => {
    if (user && currentTopicData) {
      markTopicComplete(courseId || '', currentTopicData.id);
      toast.success('Topic marked as complete!');
    }
  };

  const handleNextTopic = () => {
    if (currentTopic < course.topics.length - 1) {
      setCurrentTopic(currentTopic + 1);
      setShowPlayground(false);
    }
  };

  const handlePrevTopic = () => {
    if (currentTopic > 0) {
      setCurrentTopic(currentTopic - 1);
      setShowPlayground(false);
    }
  };

  return (
    <div className="mt-16 min-h-screen bg-gray-50 flex relative overflow-hidden">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg"
      >
        {isMobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <div className={`
        w-80 bg-white border-r border-gray-200 overflow-y-auto fixed lg:static h-screen lg:h-auto z-40 transition-transform
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Topic List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {course.topics.map((topic: any, index: number) => (
              <button
                key={topic.id}
                onClick={() => {
                  setCurrentTopic(index);
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                  currentTopic === index
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="mr-3">
                  {user && isTopicComplete(courseId || '', topic.id) ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{topic.title}</div>
                  <div className="text-xs text-gray-500">
                    Topic {index + 1} of {course.topics.length}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto lg:ml-0">
        <div className="max-w-4xl mx-auto p-4 lg:p-8">
          {/* Topic Header */}
          <div className="mb-6 lg:mb-8">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span>Topic {currentTopic + 1} of {course.topics.length}</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {currentTopicData?.title}
            </h1>
          </div>

          {/* Content */}
          <div className="prose prose-sm lg:prose-lg max-w-none mb-6 lg:mb-8">
            <div dangerouslySetInnerHTML={{ __html: currentTopicData?.content }} />
          </div>

          {/* Code Example */}
          {currentTopicData?.code && (
            <div className="mb-6 lg:mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 gap-2">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Example Code</h3>
                <button
                  onClick={() => setShowPlayground(!showPlayground)}
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full lg:w-auto"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {showPlayground ? 'Hide Playground' : 'Try It Out'}
                </button>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-xs lg:text-sm">
                  <code>{currentTopicData.code}</code>
                </pre>
              </div>

              {showPlayground && (
                <div className="mt-4">
                  <CodePlayground
                    initialCode={currentTopicData.code}
                    language={currentTopicData.language}
                  />
                </div>
              )}
            </div>
          )}

          {/* Exercise */}
          {currentTopicData?.exercise && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 lg:p-6 mb-6 lg:mb-8">
              <h3 className="text-base lg:text-lg font-semibold text-yellow-800 mb-2 flex items-center">
                <Trophy className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                Practice Exercise
              </h3>
              <p className="text-yellow-700 text-sm lg:text-base">{currentTopicData.exercise}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
            <button
              onClick={handlePrevTopic}
              disabled={currentTopic === 0}
              className="flex items-center justify-center w-full lg:w-auto px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </button>

            <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
              {user && !isTopicComplete(courseId || '', currentTopicData?.id) && (
                <button
                  onClick={handleMarkComplete}
                  className="flex items-center justify-center w-full lg:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Complete
                </button>
              )}

              <button
                onClick={handleNextTopic}
                disabled={currentTopic === course.topics.length - 1}
                className="flex items-center justify-center w-full lg:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Completion Message */}
          {progress === 100 && (
            <div className="mt-6 lg:mt-8 bg-green-50 border border-green-200 rounded-lg p-4 lg:p-6 text-center">
              <Trophy className="h-8 w-8 lg:h-12 lg:w-12 text-green-600 mx-auto mb-3 lg:mb-4" />
              <h3 className="text-lg lg:text-xl font-semibold text-green-800 mb-2">
                Congratulations!
              </h3>
              <p className="text-green-700 text-sm lg:text-base mb-3 lg:mb-4">
                You've completed all topics in this course. You can now generate your certificate!
              </p>
              <button
                onClick={() => toast.success('Certificate generation coming soon!')}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Generate Certificate
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;