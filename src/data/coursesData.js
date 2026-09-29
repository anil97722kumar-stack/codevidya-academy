export const COURSES_DATA = [
  // 1. JAVA
  {
    id: "java-mastery",
    title: "Java Masterclass (Core Java, OOPs, Collections & Multithreading)",
    category: "Programming Languages",
    badge: "Enterprise Standard",
    rating: 4.93,
    reviewsCount: 4210,
    studentsCount: "54,200+",
    duration: "42+ Hours",
    level: "Beginner to Advanced",
    instructor: "Er. Sandeep Mohanty (Principal Java Architect)",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    description: "Deep dive into Core Java, JVM Internals (Garbage Collection, ClassLoader), Object Oriented Programming, Collections Framework, Streams API, Lambda Expressions, Concurrency, and Spring Boot basics.",
    features: [
      "100% Free Complete Java Video Lectures",
      "Free JVM Architecture & Collections Revision Cheatsheets",
      "Paid Sheet: 140 Top Product Companies Java Coding Problems + Solutions",
      "Recognized Java Developer Certificate"
    ],
    pricing: {
      classes: "FREE",
      notes: "FREE",
      sheetPrice: 149,
      originalPrice: 899,
      discount: "83% OFF",
      sheetTitle: "Java SDE Cracker Sheet (140 Questions + Multi-Language Code)"
    },
    lectures: [
      {
        id: "java-l1",
        title: "Lecture 1: JVM Architecture (ClassLoader, Bytecode, Memory Areas & GC)",
        duration: "52 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/eIrMbAQSU34",
        description: "How Java achieves WORA (Write Once Run Anywhere), Heap vs Stack memory, Metaspace, and generational garbage collection (Young/Old Gen).",
        isFree: true
      },
      {
        id: "java-l2",
        title: "Lecture 2: OOPs in Java (Inheritance, Polymorphism, Abstract vs Interface)",
        duration: "60 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/xk4_1vDrzzo",
        description: "Method overloading vs overriding, dynamic method dispatch, default methods in Java 8 interfaces, and immutability design patterns.",
        isFree: true
      },
      {
        id: "java-l3",
        title: "Lecture 3: Java Collections Framework & Internal Working of HashMap",
        duration: "58 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/A74TOX803D0",
        description: "List vs Set vs Map, HashMap collision handling (LinkedList to Red-Black Tree threshold 8), hashCode() and equals() contract.",
        isFree: true
      },
      {
        id: "java-l4",
        title: "Lecture 4: Multithreading, Synchronization & Thread Pools (ExecutorService)",
        duration: "65 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/r_MbozD32eo",
        description: "Thread lifecycle, wait/notify, synchronized keyword, Volatile variables, ReentrantLock, and ThreadPoolExecutor fine-tuning.",
        isFree: true
      }
    ],
    notes: [
      {
        id: "java-n1",
        chapter: "Chapter 1: Java Memory Model & JVM Tuning Cheat Sheet",
        content: `### ☕ JVM Architecture & Memory Segments

#### 1. Java Memory Divisions:
- **Stack Memory:** Stores primitive variables and references to heap objects. Each thread has its own call stack. Thread-safe by default.
- **Heap Memory:** Stores all created objects and instance variables. Shared among all active threads.
  - **Young Generation:** Eden Space (new allocations) and Survivor Spaces (S0, S1).
  - **Old (Tenured) Generation:** Objects surviving multiple GC cycles move here.
  - **Metaspace:** Replaced PermGen in Java 8. Stores class metadata in native OS memory.

#### 2. HashMap Internal Working:
\`\`\`java
// Key Index calculation:
int hash = key.hashCode();
int index = hash & (n - 1); // where n is capacity (power of 2)
\`\`\`
- Bucket conflict: Chaining via Singly Linked List.
- If bucket size reaches **TREEIFY_THRESHOLD (8)** and total capacity >= 64, list converts into a **Red-Black Tree** to guarantee O(log N) worst-case search instead of O(N).`
      },
      {
        id: "java-n2",
        chapter: "Chapter 2: Java 8+ Streams & Lambda Expression Recipes",
        content: `### ⚡ Functional Java Cheatsheet

#### Filtering & Mapping:
\`\`\`java
List<String> names = employees.stream()
    .filter(e -> e.getSalary() > 75000)
    .map(Employee::getName)
    .sorted()
    .collect(Collectors.toList());
\`\`\`

#### Grouping By and Aggregation:
\`\`\`java
Map<String, Double> avgSalaryByDept = employees.stream()
    .collect(Collectors.groupingBy(
        Employee::getDepartment,
        Collectors.averagingDouble(Employee::getSalary)
    ));
\`\`\``
      }
    ],
    practiceSheet: {
      title: "Java SDE & Core Java Interview Coding Sheet",
      totalQuestions: 140,
      rating: 4.95,
      solvedCount: "14,800+ Students Purchased",
      description: "140 Problems spanning custom HashMap implementation, Thread-safe singleton, Producer-Consumer with BlockingQueue, and Streams API coding interview puzzles.",
      questions: [
        {
          id: "java-q1",
          title: "Implement Thread-Safe Custom Blocking Queue with wait/notify",
          difficulty: "Medium",
          tags: ["Multithreading", "Concurrency", "Synchronization"],
          companies: ["Amazon", "Goldman Sachs", "Morgan Stanley", "Uber"],
          isFreePreview: true,
          problemStatement: "Implement a thread-safe bounded BlockingQueue from scratch in Java with put(item) and take() methods using standard synchronization and condition notification.",
          exampleInput: "queue = new MyBlockingQueue(2); queue.put(1); queue.put(2); queue.take();",
          exampleOutput: "Returns 1, blocks when full or empty.",
          timeComplexity: "O(1) for put and take",
          spaceComplexity: "O(Capacity)",
          solutionApproach: "Use a LinkedList with capacity check inside a while loop (to avoid spurious wakeups) and synchronized lock with wait() and notifyAll().",
          solutions: {
            cpp: `// C++ Equivalent with std::condition_variable
#include <queue>
#include <mutex>
#include <condition_variable>

template<typename T>
class BlockingQueue {
    std::queue<T> q;
    std::mutex mtx;
    std::condition_variable not_full;
    std::condition_variable not_empty;
    size_t capacity;
public:
    BlockingQueue(size_t cap) : capacity(cap) {}
    void put(T val) {
        std::unique_lock<std::mutex> lock(mtx);
        not_full.wait(lock, [this]() { return q.size() < capacity; });
        q.push(val);
        not_empty.notify_one();
    }
    T take() {
        std::unique_lock<std::mutex> lock(mtx);
        not_empty.wait(lock, [this]() { return !q.empty(); });
        T val = q.front();
        q.pop();
        not_full.notify_one();
        return val;
    }
};`,
            python: `# Python Bounded Queue with Condition
from threading import Condition

class BlockingQueue:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.queue = []
        self.cond = Condition()

    def put(self, item):
        with self.cond:
            while len(self.queue) >= self.capacity:
                self.cond.wait()
            self.queue.append(item)
            self.cond.notify_all()

    def take(self):
        with self.cond:
            while not self.queue:
                self.cond.wait()
            item = self.queue.pop(0)
            self.cond.notify_all()
            return item`,
            java: `// Java Custom Thread-Safe Bounded Blocking Queue
import java.util.LinkedList;
import java.util.Queue;

public class CustomBlockingQueue<T> {
    private final Queue<T> queue = new LinkedList<>();
    private final int capacity;

    public CustomBlockingQueue(int capacity) {
        this.capacity = capacity;
    }

    public synchronized void put(T item) throws InterruptedException {
        while (queue.size() == capacity) {
            wait(); // Wait until space is available
        }
        queue.add(item);
        notifyAll(); // Notify consumer threads
    }

    public synchronized T take() throws InterruptedException {
        while (queue.isEmpty()) {
            wait(); // Wait until items are available
        }
        T item = queue.poll();
        notifyAll(); // Notify producer threads
        return item;
    }
}`
          }
        },
        {
          id: "java-q2",
          title: "Double-Checked Locking Singleton Pattern in Java",
          difficulty: "Medium",
          tags: ["Design Patterns", "Java Memory Model", "Volatile"],
          companies: ["Microsoft", "Oracle", "Cisco", "Adobe"],
          isFreePreview: false,
          problemStatement: "Implement a thread-safe, lazy-initialized Singleton class using the Double-Checked Locking pattern, explaining why the volatile keyword is strictly necessary.",
          exampleInput: "Singleton.getInstance() called from multiple concurrent threads",
          exampleOutput: "Single identical instance returned across all threads",
          timeComplexity: "O(1)",
          spaceComplexity: "O(1)",
          solutionApproach: "Use volatile variable to prevent instruction reordering where instance is assigned memory address before constructor completes.",
          solutions: {
            cpp: `// C++11 Thread-safe Meyers Singleton
class Singleton {
public:
    static Singleton& getInstance() {
        static Singleton instance; // Guaranteed thread-safe in C++11
        return instance;
    }
private:
    Singleton() {}
    Singleton(const Singleton&) = delete;
    void operator=(const Singleton&) = delete;
};`,
            python: `# Python Thread-safe Singleton
import threading

class Singleton:
    _instance = None
    _lock = threading.Lock()

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = cls()
        return cls._instance`,
            java: `// Java Double-Checked Locking Singleton
public class DatabaseConnection {
    // volatile ensures write to instance is visible and prevents instruction reordering
    private static volatile DatabaseConnection instance;

    private DatabaseConnection() {
        // Prevent reflection instantiation
        if (instance != null) {
            throw new RuntimeException("Use getInstance() method");
        }
    }

    public static DatabaseConnection getInstance() {
        if (instance == null) { // 1st check (no lock)
            synchronized (DatabaseConnection.class) {
                if (instance == null) { // 2nd check (with lock)
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }
}`
          }
        }
      ]
    },
    quiz: {
      passingPercentage: 70,
      questions: [
        {
          id: 1,
          question: "Why does Java 8 convert a HashMap bucket into a Red-Black Tree when elements exceed 8?",
          options: ["To save memory", "To guarantee O(log N) search time instead of O(N) during high collisions", "Because linked lists cannot store objects", "To allow duplicate keys"],
          correctAnswer: 1,
          explanation: "In worst-case hash collisions, searching a linked list degrades to O(N). A balanced Red-Black tree bounds this to O(log N)."
        },
        {
          id: 2,
          question: "What is the primary role of the 'volatile' keyword in Java?",
          options: ["Prevents class inheritance", "Guarantees atomic increment operations", "Ensures immediate visibility of changes across thread caches and prevents instruction reordering", "Saves objects to hard disk"],
          correctAnswer: 2,
          explanation: "Volatile instructs the JVM to read and write the variable directly from main RAM rather than thread CPU caches, preventing stale reads."
        },
        {
          id: 3,
          question: "Which garbage collection region holds newly created objects?",
          options: ["Tenured Old Generation", "Metaspace", "Eden Space in Young Generation", "Thread Stack"],
          correctAnswer: 2,
          explanation: "Almost all new objects are allocated initially in the Eden space of the Young Generation."
        }
      ]
    }
  },

  // 2. C PROGRAMMING
  {
    id: "c-programming",
    title: "C Language Mastery (Pointers, Memory & Data Structures in C)",
    category: "Programming Languages",
    badge: "Foundation of CS",
    rating: 4.96,
    reviewsCount: 3870,
    studentsCount: "49,800+",
    duration: "36+ Hours",
    level: "All Levels",
    instructor: "Er. Alok Ranjan (Embedded Systems & Linux Kernel Dev)",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    description: "The mother of all languages! Master pointers, double pointers, dynamic memory allocation (malloc, calloc, realloc, free), structs, unions, bitwise operators, and low-level system programming.",
    features: [
      "100% Free Complete C Video Classes",
      "Free Pointers & Memory Diagrams Notes",
      "Paid Sheet: 120 Low-Level & Data Structures in C Problems + Solutions",
      "Verified C Systems Programmer Certificate"
    ],
    pricing: {
      classes: "FREE",
      notes: "FREE",
      sheetPrice: 99,
      originalPrice: 699,
      discount: "86% OFF",
      sheetTitle: "C Programming & Pointer Interview Sheet (120 Questions + Code)"
    },
    lectures: [
      {
        id: "c-l1",
        title: "Lecture 1: Pointers Unlocked (Addresses, Dereferencing & Pointer Arithmetic)",
        duration: "50 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/zuegQmMdy8M",
        description: "Memory layout of a C program, understanding hexadecimal addresses, size of pointers, void pointers, and arithmetic nuances.",
        isFree: true
      },
      {
        id: "c-l2",
        title: "Lecture 2: Dynamic Memory Allocation (malloc, calloc, realloc, free & Valgrind)",
        duration: "55 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/4OGMB44nZ2w",
        description: "Dangling pointers, memory leaks, heap fragmentation, buffer overflows, and using Valgrind for memory diagnosis.",
        isFree: true
      },
      {
        id: "c-l3",
        title: "Lecture 3: Function Pointers, Callbacks & Struct Memory Alignment / Padding",
        duration: "58 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/w7p0FpE5yvY",
        description: "Passing functions as arguments (like qsort), structure padding, word boundary alignment, and bit-fields.",
        isFree: true
      }
    ],
    notes: [
      {
        id: "c-n1",
        chapter: "Chapter 1: Memory Layout of C Program & Pointer Cheatsheet",
        content: `### ⚙️ C Program Memory Segment Layout

\`\`\`
+-----------------------+ High Memory (0xFFFFFFFF)
|     Stack Segment     | (Local variables, function stack frames, grows downwards)
|           v           |
|                       |
|           ^           |
|     Heap Segment      | (malloc, calloc, realloc, grows upwards)
+-----------------------+
|  BSS Segment (Uninit) | (Global & static variables initialized to zero by kernel)
+-----------------------+
|  Data Segment (Init)  | (Global & static variables with non-zero values)
+-----------------------+
|  Text / Code Segment  | (Compiled CPU instructions, Read-Only)
+-----------------------+ Low Memory (0x00000000)
\`\`\`

#### Pointer Syntax Quick Reference:
- \`int *p = &x;\`: Pointer \`p\` stores address of \`x\`.
- \`*p = 50;\`: Dereference: modify the value at memory address \`p\`.
- \`int **pp = &p;\`: Pointer to pointer (Double Pointer).`
      }
    ],
    practiceSheet: {
      title: "C Language & Low-Level Systems Practice Sheet",
      totalQuestions: 120,
      rating: 4.94,
      solvedCount: "11,200+ Students Purchased",
      description: "120 Deep low-level problems: custom malloc/free simulation, circular linked list with double pointers, bitwise manipulation, and string manipulation without string.h.",
      questions: [
        {
          id: "c-q1",
          title: "Reverse a Singly Linked List using Double Pointer in C",
          difficulty: "Medium",
          tags: ["Pointers", "Linked List", "C Programming"],
          companies: ["Qualcomm", "NVIDIA", "Intel", "Texas Instruments"],
          isFreePreview: true,
          problemStatement: "Write an in-place C function that reverses a singly linked list taking a double pointer (**head) to modify the actual head pointer directly without returning a value.",
          exampleInput: "List: 1 -> 2 -> 3 -> 4 -> NULL",
          exampleOutput: "List modified to: 4 -> 3 -> 2 -> 1 -> NULL",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          solutionApproach: "Maintain prev, current, and next pointers. Update *head to prev at the end of loop.",
          solutions: {
            cpp: `// C / C++ Implementation
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void reverseList(struct Node** head_ref) {
    struct Node* prev = NULL;
    struct Node* current = *head_ref;
    struct Node* next = NULL;

    while (current != NULL) {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    *head_ref = prev; // Update original head
}`,
            python: `# Python equivalent
class Node:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
            java: `// Java equivalent
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`
          }
        }
      ]
    },
    quiz: {
      passingPercentage: 70,
      questions: [
        {
          id: 1,
          question: "What is a 'Dangling Pointer' in C?",
          options: ["A pointer pointing to NULL", "A pointer pointing to memory that has already been deallocated using free()", "A pointer that points to another pointer", "An uninitialized pointer"],
          correctAnswer: 1,
          explanation: "When memory allocated on heap is freed, but the pointer still holds that address, it becomes a dangling pointer."
        },
        {
          id: 2,
          question: "What is the difference between malloc() and calloc()?",
          options: ["malloc initializes memory to zero, calloc does not", "calloc initializes allocated memory to zero and takes two arguments", "calloc allocates memory on the stack", "There is no difference"],
          correctAnswer: 1,
          explanation: "calloc(n, size) initializes all bytes to 0, whereas malloc(n * size) leaves memory with garbage values."
        }
      ]
    }
  },

  // 3. PYTHON
  {
    id: "python-mastery",
    title: "Python Pro (Core Python, OOP, Decorators & Automation)",
    category: "Programming Languages",
    badge: "Most Versatile",
    rating: 4.95,
    reviewsCount: 5120,
    studentsCount: "68,000+",
    duration: "40+ Hours",
    level: "Beginner to Advanced",
    instructor: "Priya Nair (Senior Python Engineer & OSS Contributor)",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=80",
    description: "From Python syntax to advanced metaprogramming! List comprehensions, generators, decorators, context managers, async IO, threading vs multiprocessing, and standard libraries.",
    features: [
      "100% Free Complete Python Video Classes",
      "Free Pythonic Code & Data Structures Cheatsheet",
      "Paid Sheet: 130 Top Company Python Coding Questions with Full Code",
      "Verified Python Professional Certificate"
    ],
    pricing: {
      classes: "FREE",
      notes: "FREE",
      sheetPrice: 129,
      originalPrice: 799,
      discount: "84% OFF",
      sheetTitle: "Python Interview Mastery Sheet (130 Questions + Multi-Language Code)"
    },
    lectures: [
      {
        id: "py-l1",
        title: "Lecture 1: Python Internals (Everything is an Object, GIL & Memory Model)",
        duration: "52 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/_uQrJ0TkZlc",
        description: "PyObject struct in CPython, Global Interpreter Lock (GIL), Reference counting and cyclic garbage collector.",
        isFree: true
      },
      {
        id: "py-l2",
        title: "Lecture 2: Advanced Decorators, Closures & *args/**kwargs Under the Hood",
        duration: "58 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/FsAPt_9Bf3U",
        description: "Higher-order functions, creating parametrized decorators, functools.wraps, and class-based decorators.",
        isFree: true
      },
      {
        id: "py-l3",
        title: "Lecture 3: Generators, Iterators & Memory-Efficient Streaming with yield",
        duration: "47 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/bD05uGo_sVI",
        description: "Implementing __iter__ and __next__, generator expressions, coroutines with send(), and memory comparison vs lists.",
        isFree: true
      }
    ],
    notes: [
      {
        id: "py-n1",
        chapter: "Chapter 1: Pythonic Idioms & Comprehensions Cheat Sheet",
        content: `### 🐍 Pythonic Code Patterns

#### 1. Dictionary & List Comprehensions:
\`\`\`python
# Flatten nested matrix:
flat = [x for row in matrix for x in row if x > 0]

# Dict comprehension with filtering:
squares = {x: x**2 for x in range(10) if x % 2 == 0}
\`\`\`

#### 2. Custom Context Manager (__enter__ & __exit__):
\`\`\`python
class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.duration = time.perf_counter() - self.start
\`\`\``
      }
    ],
    practiceSheet: {
      title: "Python Interview & Automation Practice Sheet",
      totalQuestions: 130,
      rating: 4.96,
      solvedCount: "16,100+ Students Purchased",
      description: "130 Coding challenges covering LRU cache using OrderedDict, custom retry decorator with exponential backoff, rate limiters, and concurrent web crawlers.",
      questions: [
        {
          id: "py-q1",
          title: "Build a Custom Retry Decorator with Exponential Backoff",
          difficulty: "Medium",
          tags: ["Decorators", "Python", "Functional Programming"],
          companies: ["Stripe", "Netflix", "Shopify", "Airbnb"],
          isFreePreview: true,
          problemStatement: "Implement a Python decorator @retry(max_retries=3, delay=1.0, backoff=2.0) that automatically retries an unreliable network function upon exception with exponentially increasing delays.",
          exampleInput: "@retry(max_retries=3) def fetch_data(): ...",
          exampleOutput: "Retries 3 times before finally raising the exception.",
          timeComplexity: "O(1) per retry overhead",
          spaceComplexity: "O(1)",
          solutionApproach: "Use functools.wraps and a nested wrapper function with a loop tracking attempts and time.sleep(current_delay).",
          solutions: {
            cpp: `// C++ Retry Pattern
#include <iostream>
#include <chrono>
#include <thread>
#include <functional>

template<typename Func>
void retry(Func f, int maxRetries = 3, int delayMs = 1000, double backoff = 2.0) {
    int attempts = 0;
    while (true) {
        try {
            f();
            return;
        } catch (...) {
            if (++attempts >= maxRetries) throw;
            std::this_thread::sleep_for(std::chrono::milliseconds(delayMs));
            delayMs = (int)(delayMs * backoff);
        }
    }
}`,
            python: `# Python Exponential Backoff Decorator
import time
from functools import wraps

def retry(max_retries=3, initial_delay=1.0, backoff=2.0):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            delay = initial_delay
            for attempt in range(1, max_retries + 1):
                try:
                    return fn(*args, **kwargs)
                except Exception as e:
                    if attempt == max_retries:
                        raise e
                    print(f"Attempt {attempt} failed: {e}. Retrying in {delay}s...")
                    time.sleep(delay)
                    delay *= backoff
        return wrapper
    return decorator`,
            java: `// Java Retry Helper
public class RetryUtils {
    public static <T> T retry(SupplierWithException<T> action, int maxRetries, long delayMs, double backoff) throws Exception {
        int attempts = 0;
        long currentDelay = delayMs;
        while (true) {
            try {
                return action.get();
            } catch (Exception e) {
                if (++attempts >= maxRetries) throw e;
                Thread.sleep(currentDelay);
                currentDelay = (long)(currentDelay * backoff);
            }
        }
    }
}`
          }
        }
      ]
    },
    quiz: {
      passingPercentage: 70,
      questions: [
        {
          id: 1,
          question: "What is the Global Interpreter Lock (GIL) in CPython?",
          options: ["A lock that prevents file editing", "A mutex that prevents multiple native threads from executing Python bytecodes simultaneously", "A security firewall", "A package manager"],
          correctAnswer: 1,
          explanation: "CPython's memory management is not thread-safe, so the GIL ensures only one native thread runs Python bytecode at any given moment."
        },
        {
          id: 2,
          question: "What is the difference between a Generator and a regular Python function?",
          options: ["Generators return lists", "Generators produce items on-demand using 'yield' maintaining execution state and consuming O(1) memory", "Generators cannot take arguments", "Generators run only in C++"],
          correctAnswer: 1,
          explanation: "Generators pause execution at yield and resume upon next(), yielding lazy evaluation with minimal memory overhead."
        }
      ]
    }
  },

  // 4. C# (.NET)
  {
    id: "csharp-dotnet",
    title: "C# & .NET Core Mastery (OOP, LINQ, Async/Await & Web APIs)",
    category: "Programming Languages",
    badge: "Enterprise & Gaming",
    rating: 4.89,
    reviewsCount: 2310,
    studentsCount: "31,500+",
    duration: "38+ Hours",
    level: "Intermediate",
    instructor: "David Miller (Principal .NET Solutions Architect)",
    thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=80",
    description: "Learn modern C# 12 and .NET 8. Master Object Oriented principles, LINQ query operators, Delegates & Events, Async/Await concurrency, Dependency Injection, and building high-performance REST APIs.",
    features: [
      "100% Free Complete C# Video Lectures",
      "Free LINQ & .NET Architecture Reference Notes",
      "Paid Sheet: 110 Enterprise C# & .NET Coding Tasks with Solutions",
      "Verified .NET Specialist Certificate"
    ],
    pricing: {
      classes: "FREE",
      notes: "FREE",
      sheetPrice: 129,
      originalPrice: 799,
      discount: "84% OFF",
      sheetTitle: "C# & .NET Interview Cracker Sheet (110 Questions + Code)"
    },
    lectures: [
      {
        id: "cs-l1",
        title: "Lecture 1: CLR, IL (Intermediate Language) & Garbage Collection in .NET",
        duration: "50 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/GhQdlIFylQ8",
        description: "Common Language Runtime (CLR), JIT compilation, Value types vs Reference types (Struct vs Class), Boxing and Unboxing overhead.",
        isFree: true
      },
      {
        id: "cs-l2",
        title: "Lecture 2: LINQ (Language Integrated Query) & Expression Trees",
        duration: "56 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/8rW5V7Y8uM8",
        description: "Deferred execution vs Immediate execution, IEnumerable vs IQueryable, GroupBy, SelectMany, and Join operations.",
        isFree: true
      },
      {
        id: "cs-l3",
        title: "Lecture 3: Asynchronous Programming with async, await & Task Parallel Library (TPL)",
        duration: "54 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/2moh18sh5p4",
        description: "SynchronizationContext, avoiding deadlocks with ConfigureAwait(false), Task.WhenAll, and CancellationToken usage.",
        isFree: true
      }
    ],
    notes: [
      {
        id: "cs-n1",
        chapter: "Chapter 1: C# Memory Management & LINQ Best Practices",
        content: `### 🎯 C# & .NET Architecture Essentials

#### 1. Struct vs Class:
- **Struct (Value Type):** Allocated on the stack (unless part of a class instance). Passed by value. No inheritance (except interfaces).
- **Class (Reference Type):** Allocated on the Managed Heap. Passed by reference. Supports full OOP inheritance.

#### 2. LINQ Deferred Execution:
\`\`\`csharp
// Deferred: Query is NOT executed here!
var query = customers.Where(c => c.Balance > 1000);

// Executed when iterated:
foreach(var c in query) { ... }
// Or triggered by .ToList(), .Count(), .First()
\`\`\``
      }
    ],
    practiceSheet: {
      title: "C# & .NET Enterprise Interview Practice Sheet",
      totalQuestions: 110,
      rating: 4.91,
      solvedCount: "7,800+ Students Purchased",
      description: "110 Problems covering custom thread-safe Object Pool in C#, custom LINQ extension methods, async pipeline processors, and Dependency Injection container patterns.",
      questions: [
        {
          id: "cs-q1",
          title: "Implement a High-Performance Object Pool in C#",
          difficulty: "Medium",
          tags: ["C#", ".NET", "Memory Optimization", "Collections"],
          companies: ["Microsoft", "Epic Games", "Unity", "Amazon"],
          isFreePreview: true,
          problemStatement: "Design a thread-safe generic ObjectPool<T> in C# using ConcurrentBag<T> to reduce garbage collection pressure by reusing expensive objects.",
          exampleInput: "var pool = new ObjectPool<MemoryStream>(() => new MemoryStream()); var obj = pool.Get(); pool.Return(obj);",
          exampleOutput: "Reuses same instance without new heap allocation.",
          timeComplexity: "O(1)",
          spaceComplexity: "O(Max Objects)",
          solutionApproach: "Use ConcurrentBag or lock-free ConcurrentQueue to store idle instances with a factory delegate.",
          solutions: {
            cpp: `// C++ Object Pool
#include <vector>
#include <memory>
#include <mutex>

template<typename T>
class ObjectPool {
    std::vector<std::unique_ptr<T>> pool;
    std::mutex mtx;
public:
    std::unique_ptr<T> acquire() {
        std::lock_guard<std::mutex> lock(mtx);
        if (pool.empty()) return std::make_unique<T>();
        auto obj = std::move(pool.back());
        pool.pop_back();
        return obj;
    }
    void release(std::unique_ptr<T> obj) {
        std::lock_guard<std::mutex> lock(mtx);
        pool.push_back(std::move(obj));
    }
};`,
            python: `# Python Object Pool
from queue import Queue

class ObjectPool:
    def __init__(self, factory, max_size=10):
        self.factory = factory
        self.pool = Queue(maxsize=max_size)

    def acquire(self):
        if not self.pool.empty():
            return self.pool.get()
        return self.factory()

    def release(self, obj):
        if not self.pool.full():
            self.pool.put(obj)`,
            java: `// Java Generic Object Pool
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.function.Supplier;

public class ObjectPool<T> {
    private final ConcurrentLinkedQueue<T> pool = new ConcurrentLinkedQueue<>();
    private final Supplier<T> factory;

    public ObjectPool(Supplier<T> factory) {
        this.factory = factory;
    }

    public T acquire() {
        T obj = pool.poll();
        return (obj != null) ? obj : factory.get();
    }

    public void release(T obj) {
        pool.offer(obj);
    }
}`
          }
        }
      ]
    },
    quiz: {
      passingPercentage: 70,
      questions: [
        {
          id: 1,
          question: "What is 'Boxing' in C#?",
          options: ["Packaging a project into a zip file", "Converting a Value Type (like int) into an object Reference Type on the heap", "Hiding private variables", "Running tests in a sandbox"],
          correctAnswer: 1,
          explanation: "Boxing wraps a value type in an System.Object instance and allocates it on the managed heap."
        },
        {
          id: 2,
          question: "What is the primary difference between IEnumerable<T> and IQueryable<T>?",
          options: ["IEnumerable is for XML only", "IQueryable executes filtering on the remote database server via SQL, while IEnumerable filters in-memory on client", "They are 100% identical", "IEnumerable cannot be looped"],
          correctAnswer: 1,
          explanation: "IQueryable builds an Expression Tree that ORMs like Entity Framework translate into SQL executed directly by the database."
        }
      ]
    }
  },

  // 5. PHP
  {
    id: "php-backend",
    title: "Modern PHP 8+ & Backend Architecture (OOP, PDO, Security & Laravel)",
    category: "Web Development",
    badge: "Powers 75% of the Web",
    rating: 4.86,
    reviewsCount: 2650,
    studentsCount: "36,400+",
    duration: "34+ Hours",
    level: "Beginner to Pro",
    instructor: "Er. Faizan Ahmed (Full Stack Web Architect)",
    thumbnail: "https://images.unsplash.com/photo-1599507593499-a3f7f7d97667?w=800&auto=format&fit=crop&q=80",
    description: "Learn modern typed PHP 8.3! Object-Oriented PHP, Composer package management, PDO prepared statements, Secure Authentication, CSRF/XSS prevention, MVC pattern, and REST API development.",
    features: [
      "100% Free Complete PHP 8 Video Lessons",
      "Free Web Security & PDO SQL Injection Cheat Sheet",
      "Paid Sheet: 115 PHP Backend & Laravel Interview Questions + Solutions",
      "Verified PHP Backend Developer Certificate"
    ],
    pricing: {
      classes: "FREE",
      notes: "FREE",
      sheetPrice: 119,
      originalPrice: 699,
      discount: "83% OFF",
      sheetTitle: "Modern PHP & Web Security Practice Sheet (115 Questions + Code)"
    },
    lectures: [
      {
        id: "php-l1",
        title: "Lecture 1: Modern PHP 8 Features (Constructor Promotion, Match, Typed Properties)",
        duration: "48 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/2eebptXfEvw",
        description: "Strict types, nullsafe operator (?->), union types, match expressions vs switch, and attributes.",
        isFree: true
      },
      {
        id: "php-l2",
        title: "Lecture 2: Secure Database Access with PDO & Prepared Statements",
        duration: "52 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/kEW6f7Pilc4",
        description: "Why mysql_* extensions were removed, PDO connection options, parameterized queries preventing SQL injection, and transactions.",
        isFree: true
      },
      {
        id: "php-l3",
        title: "Lecture 3: Web Security in PHP (CSRF, XSS, Session Hijacking & Password Hashing)",
        duration: "61 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/BUCiSSyIGGU",
        description: "password_hash() with Argon2id/Bcrypt, session_regenerate_id(), HttpOnly and SameSite cookies, and htmlspecialchars sanitization.",
        isFree: true
      }
    ],
    notes: [
      {
        id: "php-n1",
        chapter: "Chapter 1: PHP 8 Security & PDO Prepared Statements Cheat Sheet",
        content: `### 🛡️ PHP Security & Database Best Practices

#### 1. Preventing SQL Injection with PDO:
\`\`\`php
// ALWAYS use prepared statements with placeholders:
$stmt = $pdo->prepare("SELECT id, name, email FROM users WHERE email = :email AND status = :status");
$stmt->execute([
    ':email' => $email,
    ':status' => 'active'
]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
\`\`\`

#### 2. Secure Password Hashing:
\`\`\`php
// Hash:
$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

// Verify:
if (password_verify($password, $hash)) {
    // Correct password
}
\`\`\``
      }
    ],
    practiceSheet: {
      title: "PHP Backend & Security Engineering Practice Sheet",
      totalQuestions: 115,
      rating: 4.89,
      solvedCount: "8,300+ Students Purchased",
      description: "115 Real-world problems: custom MVC router, CSRF token middleware, secure token authentication, file upload validator, and rate limiting with Redis in PHP.",
      questions: [
        {
          id: "php-q1",
          title: "Build a Secure Session & CSRF Token Verification Middleware in PHP",
          difficulty: "Medium",
          tags: ["PHP", "Security", "CSRF", "Sessions"],
          companies: ["Automattic", "Magento", "Slack", "Envato"],
          isFreePreview: true,
          problemStatement: "Implement a secure CSRF token generator and validator in PHP using cryptographically secure random bytes (random_bytes) and hash_equals to protect form submissions from CSRF attacks.",
          exampleInput: "generateCsrfToken(); validateCsrfToken($_POST['csrf_token']);",
          exampleOutput: "Returns true if valid token, throws 403 Forbidden if mismatched.",
          timeComplexity: "O(1)",
          spaceComplexity: "O(1)",
          solutionApproach: "Generate 32-byte hex token, store in $_SESSION['csrf_token'], and verify incoming POST token using timing-attack safe hash_equals().",
          solutions: {
            cpp: `// C++ Equivalent token comparison
#include <string>
#include <openssl/crypto.h>

bool timingSafeCompare(const std::string& a, const std::string& b) {
    if (a.size() != b.size()) return false;
    return CRYPTO_memcmp(a.data(), b.data(), a.size()) == 0;
}`,
            python: `# Python secrets token comparison
import secrets

def generate_csrf_token():
    return secrets.token_hex(32)

def validate_csrf_token(stored_token, submitted_token):
    if not stored_token or not submitted_token:
        return False
    return secrets.compare_digest(stored_token, submitted_token)`,
            java: `// Java MessageDigest.isEqual
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;

public class CsrfProtection {
    public static String generateToken() {
        byte[] bytes = new byte[32];
        new SecureRandom().nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
    public static boolean validate(String token1, String token2) {
        if (token1 == null || token2 == null) return false;
        return MessageDigest.isEqual(token1.getBytes(), token2.getBytes());
    }
}`
          }
        }
      ]
    },
    quiz: {
      passingPercentage: 70,
      questions: [
        {
          id: 1,
          question: "Why should you use hash_equals() instead of '==' to compare sensitive tokens or hashes in PHP?",
          options: ["hash_equals() is faster", "To prevent timing attacks that can guess tokens based on string comparison time", "Because '==' does not work on strings", "To automatically hash input"],
          correctAnswer: 1,
          explanation: "Standard '==' returns false on the first mismatched character (timing leakage). hash_equals takes constant time regardless of match position."
        },
        {
          id: 2,
          question: "Which function is recommended for password hashing in modern PHP?",
          options: ["md5()", "sha1()", "password_hash()", "base64_encode()"],
          correctAnswer: 2,
          explanation: "password_hash() uses adaptive, salted one-way hashing algorithms like Bcrypt or Argon2, resistant to rainbow tables and GPU brute force."
        }
      ]
    }
  },

  // 6. COMPUTER ARCHITECTURE & ORGANIZATION (CAO)
  {
    id: "computer-architecture",
    title: "Computer Architecture & Organization (CAO: CPU, Pipelining & Cache)",
    category: "Core Computer Science",
    badge: "Hardware & GATE Core",
    rating: 4.88,
    reviewsCount: 1940,
    studentsCount: "29,600+",
    duration: "35+ Hours",
    level: "Intermediate",
    instructor: "Prof. Hemant Joshi (PhD Computer Engineering, IIT Kanpur)",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    description: "Understand how computers really execute code at the silicon level! Instruction Set Architecture (ISA), RISC vs CISC, Instruction Pipelining & Hazards, Cache Memory Mapping (Direct, Set-Associative), and Memory Hierarchy.",
    features: [
      "100% Free Complete CAO Visual Lecture Series",
      "Free Cache Mapping & Pipeline Calculation Cheatsheet",
      "Paid Sheet: 110 GATE & Hardware Engineering Problems + Numerical Solutions",
      "Verified Computer Systems Architect Certificate"
    ],
    pricing: {
      classes: "FREE",
      notes: "FREE",
      sheetPrice: 119,
      originalPrice: 699,
      discount: "83% OFF",
      sheetTitle: "Computer Architecture & GATE Interview Sheet (110 Questions + Code)"
    },
    lectures: [
      {
        id: "cao-l1",
        title: "Lecture 1: Instruction Cycle, Von Neumann vs Harvard & Registers",
        duration: "49 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/Ol8D69VKX2k",
        description: "Fetch-Decode-Execute cycle, Program Counter (PC), Instruction Register (IR), Memory Address Register (MAR), and bus organization.",
        isFree: true
      },
      {
        id: "cao-l2",
        title: "Lecture 2: Instruction Pipelining & Pipeline Hazards (Structural, Data & Control)",
        duration: "57 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/9Gz_3sIu1-Q",
        description: "Pipeline stages (IF, ID, EX, MEM, WB), RAW/WAR/WAW hazards, branch prediction, and calculating pipeline speedup factor.",
        isFree: true
      },
      {
        id: "cao-l3",
        title: "Lecture 3: Cache Memory Mapping (Direct Mapped, Fully Associative & Set-Associative)",
        duration: "63 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/YgS2t8_e8J4",
        description: "Tag, Set/Index, and Block Offset bit calculations. Hit latency, miss penalty, Average Memory Access Time (AMAT), and write policies.",
        isFree: true
      }
    ],
    notes: [
      {
        id: "cao-n1",
        chapter: "Chapter 1: Cache Memory Calculations & Pipeline Speedup Cheat Sheet",
        content: `### 💾 CAO Key Formulas & Memory Hierarchy

#### 1. Average Memory Access Time (AMAT):
\`\`\`
AMAT = Hit_Time + (Miss_Rate * Miss_Penalty)
\`\`\`
- If multi-level cache (L1, L2):
\`\`\`
AMAT = T_L1 + (M_L1 * (T_L2 + (M_L2 * T_RAM)))
\`\`\`

#### 2. K-Stage Pipeline Speedup:
For \`N\` instructions through a \`K\`-stage pipeline:
- **Non-pipelined Time:** \`T_non = N * K * clock_cycle\`
- **Ideal Pipelined Time:** \`T_pipe = (K + N - 1) * clock_cycle\`
- **Ideal Speedup (\`N -> infinity\`):** \`Speedup = K\` (Number of stages).

#### 3. Set-Associative Cache Address Bits:
- Physical Address = **[Tag bits] [Set Index bits] [Byte Offset bits]**
- Number of Sets = \`Total Cache Size / (Set Associativity * Block Size)\`
- \`Set Index bits = log2(Number of Sets)\`
- \`Byte Offset bits = log2(Block Size in bytes)\``
      }
    ],
    practiceSheet: {
      title: "Computer Architecture Numerical & Simulation Practice Sheet",
      totalQuestions: 110,
      rating: 4.92,
      solvedCount: "7,400+ Students Purchased",
      description: "110 Problems covering Cache Hit/Miss simulations, Pipeline Stall analyzers, Floating Point IEEE 754 converters in C++/Python, and GATE numerical solutions.",
      questions: [
        {
          id: "cao-q1",
          title: "Simulate K-Way Set-Associative Cache Hit/Miss Analyzer",
          difficulty: "Medium",
          tags: ["Cache Memory", "Computer Architecture", "Simulation"],
          companies: ["Intel", "AMD", "Arm", "Apple Silicon", "Qualcomm"],
          isFreePreview: true,
          problemStatement: "Given cache capacity, block size, set associativity K, and a sequence of 32-bit hex memory addresses, write a program to simulate cache access and count total Hits and Misses using LRU replacement.",
          exampleInput: "Cache: 32KB, Block: 64B, 4-Way Associative; Addresses: [0x1000, 0x1040, 0x1000, 0x2000]",
          exampleOutput: "Total Accesses: 4, Hits: 1, Misses: 3, Hit Ratio: 25%",
          timeComplexity: "O(K) per access",
          spaceComplexity: "O(Number of Sets * K)",
          solutionApproach: "Extract tag and set index using bitwise masks. Within target set, look for matching tag. If missing, evict LRU entry.",
          solutions: {
            cpp: `// C++ Cache Simulator
#include <iostream>
#include <vector>
#include <list>
#include <unordered_map>

class SetAssociativeCache {
    int numSets, K, offsetBits, indexBits;
    struct CacheSet {
        std::list<uint32_t> lruList; // stores tags
    };
    std::vector<CacheSet> sets;
public:
    SetAssociativeCache(int cacheSize, int blockSize, int ways) : K(ways) {
        numSets = cacheSize / (blockSize * ways);
        offsetBits = __builtin_ctz(blockSize);
        indexBits = __builtin_ctz(numSets);
        sets.resize(numSets);
    }

    bool access(uint32_t address) {
        uint32_t setIndex = (address >> offsetBits) & (numSets - 1);
        uint32_t tag = address >> (offsetBits + indexBits);
        auto& s = sets[setIndex];

        for (auto it = s.lruList.begin(); it != s.lruList.end(); ++it) {
            if (*it == tag) {
                s.lruList.erase(it);
                s.lruList.push_front(tag); // Move to MRU
                return true; // HIT
            }
        }
        // MISS
        if (s.lruList.size() >= K) s.lruList.pop_back(); // Evict LRU
        s.lruList.push_front(tag);
        return false;
    }
};`,
            python: `# Python Cache Simulator
class CacheSimulator:
    def __init__(self, cache_size, block_size, ways):
        self.ways = ways
        self.num_sets = cache_size // (block_size * ways)
        self.offset_bits = (block_size).bit_length() - 1
        self.index_bits = (self.num_sets).bit_length() - 1
        self.sets = [[] for _ in range(self.num_sets)]

    def access(self, address):
        set_index = (address >> self.offset_bits) & (self.num_sets - 1)
        tag = address >> (self.offset_bits + self.index_bits)
        s = self.sets[set_index]

        if tag in s:
            s.remove(tag)
            s.insert(0, tag) # Hit: MRU
            return True
        else:
            if len(s) >= self.ways:
                s.pop() # Evict LRU
            s.insert(0, tag)
            return False`,
            java: `// Java Cache Simulator
import java.util.*;

public class CacheSimulator {
    private final int numSets, ways, offsetBits, indexBits;
    private final List<LinkedList<Long>> sets;

    public CacheSimulator(int cacheSize, int blockSize, int ways) {
        this.ways = ways;
        this.numSets = cacheSize / (blockSize * ways);
        this.offsetBits = Integer.numberOfTrailingZeros(blockSize);
        this.indexBits = Integer.numberOfTrailingZeros(numSets);
        this.sets = new ArrayList<>();
        for (int i = 0; i < numSets; i++) sets.add(new LinkedList<>());
    }

    public boolean access(long address) {
        int setIndex = (int)((address >> offsetBits) & (numSets - 1));
        long tag = address >> (offsetBits + indexBits);
        LinkedList<Long> s = sets.get(setIndex);

        if (s.contains(tag)) {
            s.remove(tag);
            s.addFirst(tag);
            return true;
        }
        if (s.size() >= ways) s.removeLast();
        s.addFirst(tag);
        return false;
    }
}`
          }
        }
      ]
    },
    quiz: {
      passingPercentage: 70,
      questions: [
        {
          id: 1,
          question: "Which pipeline hazard occurs when an instruction depends on the result of a previous instruction that has not yet completed?",
          options: ["Structural Hazard", "Data Hazard (RAW - Read After Write)", "Control Hazard", "Bus Contention Hazard"],
          correctAnswer: 1,
          explanation: "Data hazard occurs when operand values are needed before the producer instruction writes them back."
        },
        {
          id: 2,
          question: "If a cache has 64-byte blocks and a 32-bit physical address, how many bits are used for the Byte Offset?",
          options: ["4 bits", "5 bits", "6 bits (since 2^6 = 64)", "8 bits"],
          correctAnswer: 2,
          explanation: "log2(64) = 6 bits are required to address each of the 64 individual bytes within a cache block."
        }
      ]
    }
  },

  // 7. DSA MASTERY (Existing)
  {
    id: "dsa-mastery",
    title: "Data Structures & Algorithms (DSA Mastery)",
    category: "DSA & Coding",
    badge: "Most Popular",
    rating: 4.9,
    reviewsCount: 3420,
    studentsCount: "48,500+",
    duration: "45+ Hours",
    level: "Beginner to Advanced",
    instructor: "Er. Rajesh Verma (Ex-FAANG Senior Engineer)",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80",
    description: "Master problem solving from scratch to advanced. Complete coverage of Arrays, Linked Lists, Trees, Graphs, DP, Recursion, Bit Manipulation with FAANG interview questions.",
    features: [
      "100% Free HD Video Lectures",
      "Comprehensive Free Handcrafted Notes",
      "Paid Sheet: 180 Curated FAANG Problems with Multi-language Solutions",
      "Recognized Course Completion Certificate"
    ],
    pricing: {
      classes: "FREE",
      notes: "FREE",
      sheetPrice: 149,
      originalPrice: 999,
      discount: "85% OFF",
      sheetTitle: "DSA SDE Cracker Sheet (180 Questions + Complete Code Solutions)"
    },
    lectures: [
      {
        id: "l1",
        title: "Lecture 1: Time & Space Complexity Analysis (Big O, Theta, Omega)",
        duration: "42 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/8hly31xKli0",
        description: "Deep dive into asymptotic notations, analyzing recursive relations, space complexity trade-offs, and master theorem with practical examples.",
        isFree: true
      },
      {
        id: "l2",
        title: "Lecture 2: Arrays & Two Pointer Technique in Depth",
        duration: "58 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/4Zf8FhZfWzY",
        description: "Learn dynamic arrays, sliding window, prefix sums, Kadane's algorithm, and two pointer patterns with step-by-step visualizations.",
        isFree: true
      },
      {
        id: "l3",
        title: "Lecture 3: Singly & Doubly Linked Lists & Cycle Detection",
        duration: "51 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/njTh_OwMljA",
        description: "Pointers manipulation, reversing in K-groups, Floyd's Cycle finding algorithm (Tortoise & Hare), and LRU cache basics.",
        isFree: true
      },
      {
        id: "l4",
        title: "Lecture 4: Stacks, Queues & Monotonic Stack Patterns",
        duration: "49 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/GYptUgnIM_I",
        description: "Next Greater Element, Largest Rectangle in Histogram, Trapping Rainwater, and implementing Min Stack in O(1) time.",
        isFree: true
      },
      {
        id: "l5",
        title: "Lecture 5: Binary Trees, BST & Tree Traversals",
        duration: "65 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/fAAZixBzIAI",
        description: "Inorder, Preorder, Postorder (recursive & iterative), Level Order, LCA, Diameter of Tree, and BST validation.",
        isFree: true
      },
      {
        id: "l6",
        title: "Lecture 6: Dynamic Programming (Memoization to Tabulation)",
        duration: "74 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/oBt53YbR9Kk",
        description: "0/1 Knapsack, Longest Common Subsequence, Coin Change, Matrix Chain Multiplication, and State Transition intuition.",
        isFree: true
      }
    ],
    notes: [
      {
        id: "n1",
        chapter: "Chapter 1: Asymptotic Notations & Complexity Cheat Sheet",
        content: `### 📌 Time & Space Complexity Master Sheet

#### 1. Big-O Complexity Chart (Fastest to Slowest)
- **O(1) - Constant Time:** Direct array indexing, Hash map lookups (average), push/pop on stack.
- **O(log N) - Logarithmic Time:** Binary Search, finding height of balanced BST.
- **O(N) - Linear Time:** Single loop traversing an array, linear search.
- **O(N log N) - Linearithmic Time:** Merge Sort, Heap Sort, Quick Sort (average).
- **O(N²) - Quadratic Time:** Nested loops, Bubble sort, Insertion sort.
- **O(2ⁿ) - Exponential Time:** Recursive Fibonacci without memoization, generating subsets.
- **O(N!) - Factorial Time:** Traveling Salesperson via brute force, generating permutations.`
      },
      {
        id: "n2",
        chapter: "Chapter 2: Essential Array & Two-Pointer Patterns",
        content: `### 🚀 Two Pointer & Sliding Window Patterns

#### 1. Opposite Ends Two-Pointer
Used in sorted arrays for Pair Sum, 3Sum, Container with Most Water.
\`\`\`cpp
int left = 0, right = n - 1;
while(left < right) {
    int sum = arr[left] + arr[right];
    if(sum == target) return {left, right};
    else if(sum < target) left++;
    else right--;
}
\`\`\``
      }
    ],
    practiceSheet: {
      title: "FAANG & Top Product Companies DSA Cracker Sheet",
      totalQuestions: 180,
      rating: 4.95,
      solvedCount: "12,400+ Students Purchased",
      description: "Carefully curated hand-picked 180 problems with optimal C++, Java, & Python solutions, step-by-step logic, complexity explanation, and company tags.",
      questions: [
        {
          id: "q1",
          title: "Two Sum (Return Indices of Pair)",
          difficulty: "Easy",
          tags: ["Arrays", "Hash Map"],
          companies: ["Google", "Amazon", "Microsoft", "Meta"],
          isFreePreview: true,
          problemStatement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
          exampleInput: "nums = [2,7,11,15], target = 9",
          exampleOutput: "[0,1] (Because nums[0] + nums[1] == 9)",
          timeComplexity: "O(N)",
          spaceComplexity: "O(N)",
          solutionApproach: "Use a Hash Map to store complement (target - num) with index.",
          solutions: {
            cpp: `// C++ Solution - Time: O(N), Space: O(N)
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int comp = target - nums[i];
            if (seen.count(comp)) return {seen[comp], i};
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
            python: `# Python Solution - Time: O(N), Space: O(N)
class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            comp = target - num
            if comp in seen:
                return [seen[comp], i]
            seen[num] = i
        return []`,
            java: `// Java Solution - Time: O(N), Space: O(N)
import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (map.containsKey(comp)) return new int[] { map.get(comp), i };
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`
          }
        },
        {
          id: "q2",
          title: "Trapping Rain Water",
          difficulty: "Hard",
          tags: ["Arrays", "Two Pointers"],
          companies: ["Google", "Amazon", "Apple"],
          isFreePreview: true,
          problemStatement: "Given n non-negative integers representing elevation map, compute trapped rainwater.",
          exampleInput: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
          exampleOutput: "6 units of water",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          solutionApproach: "Use two pointers from left and right maintaining max_left and max_right.",
          solutions: {
            cpp: `// C++ Two Pointers
int trap(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
        if (height[left] <= height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    return water;
}`,
            python: `# Python Two Pointers
def trap(height):
    left, right = 0, len(height) - 1
    left_max, right_max, water = 0, 0, 0
    while left < right:
        if height[left] <= height[right]:
            if height[left] >= left_max: left_max = height[left]
            else: water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max: right_max = height[right]
            else: water += right_max - height[right]
            right -= 1
    return water`,
            java: `// Java Two Pointers
public int trap(int[] height) {
    int left = 0, right = height.length - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
        if (height[left] <= height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    return water;
}`
          }
        }
      ]
    },
    quiz: {
      passingPercentage: 70,
      questions: [
        {
          id: 1,
          question: "What is the worst-case time complexity of QuickSort?",
          options: ["O(N log N)", "O(N²)", "O(log N)", "O(N)"],
          correctAnswer: 1,
          explanation: "When pivot is consistently chosen as the smallest or largest element, QuickSort degrades to O(N²)."
        },
        {
          id: 2,
          question: "Which data structure is primarily used for Breadth-First Search (BFS)?",
          options: ["Stack", "Queue", "Priority Queue", "BST"],
          correctAnswer: 1,
          explanation: "BFS explores nodes level by level using a FIFO Queue."
        }
      ]
    }
  },

  // 8. OS & SYSTEMS (Existing)
  {
    id: "os-systems",
    title: "Operating Systems & System Architecture",
    category: "Core Computer Science",
    badge: "GATE & FAANG Prep",
    rating: 4.85,
    reviewsCount: 2190,
    studentsCount: "32,100+",
    duration: "38+ Hours",
    level: "Intermediate",
    instructor: "Prof. Ananya Sen (PhD Computer Science, IIT Bombay)",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    description: "Deep dive into CPU Scheduling, Process Synchronization, Deadlocks, Virtual Memory Paging, File Systems, and Linux Kernel Internals.",
    features: [
      "Free Full Video Course with Animated Visuals",
      "Free Downloadable Revision Notes",
      "Paid Sheet: 120 GATE + Top Tech Interview Problems with Code Solutions",
      "Official Verified Course Completion Certificate"
    ],
    pricing: {
      classes: "FREE",
      notes: "FREE",
      sheetPrice: 129,
      originalPrice: 799,
      discount: "84% OFF",
      sheetTitle: "OS & System Design Interview Master Sheet (120 Questions + Code)"
    },
    lectures: [
      {
        id: "os-l1",
        title: "Lecture 1: Processes, Threads & PCB",
        duration: "46 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/26QPDBe-NB8",
        description: "Process life cycle, Context Switching, Fork() system call, and user vs kernel threads.",
        isFree: true
      },
      {
        id: "os-l2",
        title: "Lecture 2: CPU Scheduling Algorithms (FCFS, SJF, Round Robin)",
        duration: "54 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/ewbv3b9O560",
        description: "Turnaround Time, Waiting Time, Gantt Charts and Convoy Effect.",
        isFree: true
      }
    ],
    notes: [
      {
        id: "os-n1",
        chapter: "Chapter 1: Process Synchronization & Semaphore Cheat Sheet",
        content: `### 🔒 Critical Section & Synchronization
1. **Mutual Exclusion:** Only one process can execute in critical section.
2. **Progress:** Deciding who enters next without blocking.
3. **Bounded Waiting:** Limit on waiting time.`
      }
    ],
    practiceSheet: {
      title: "Operating Systems Core & Coding Practice Sheet",
      totalQuestions: 120,
      rating: 4.9,
      solvedCount: "8,900+ Students Purchased",
      description: "120 Problems covering Multithreading, Banker's algorithm in C++/Python, and LRU Page Cache.",
      questions: [
        {
          id: "os-q1",
          title: "Implement LRU (Least Recently Used) Cache",
          difficulty: "Hard",
          tags: ["Hash Map", "Doubly Linked List", "OS Paging"],
          companies: ["Google", "Amazon", "Microsoft"],
          isFreePreview: true,
          problemStatement: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) get and put.",
          exampleInput: "capacity = 2; put(1, 1); put(2, 2); get(1); put(3, 3); get(2);",
          exampleOutput: "[null, null, 1, null, -1] (2 was evicted)",
          timeComplexity: "O(1)",
          spaceComplexity: "O(Capacity)",
          solutionApproach: "Use a Hash Map pairing keys to Doubly Linked List nodes.",
          solutions: {
            cpp: `// C++ LRU Cache
#include <unordered_map>
using namespace std;
// LRU using Doubly Linked List and Hash Map`,
            python: `# Python LRU using OrderedDict
from collections import OrderedDict
class LRUCache(OrderedDict):
    def __init__(self, capacity: int):
        self.cap = capacity
    def get(self, key: int) -> int:
        if key not in self: return -1
        self.move_to_end(key)
        return self[key]
    def put(self, key: int, value: int) -> None:
        if key in self: self.move_to_end(key)
        self[key] = value
        if len(self) > self.cap: self.popitem(last=False)`,
            java: `// Java LRU Cache
import java.util.LinkedHashMap;
import java.util.Map;
class LRUCache extends LinkedHashMap<Integer, Integer> {
    private int capacity;
    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
}`
          }
        }
      ]
    },
    quiz: {
      passingPercentage: 70,
      questions: [
        {
          id: 1,
          question: "Belady's Anomaly occurs in which page replacement algorithm?",
          options: ["Optimal", "LRU", "FIFO", "LFU"],
          correctAnswer: 2,
          explanation: "In FIFO page replacement, adding more frames can cause more page faults."
        }
      ]
    }
  },

  // 9. DBMS & SQL (Existing)
  {
    id: "dbms-sql",
    title: "Database Management Systems (DBMS & SQL)",
    category: "Databases & Backend",
    badge: "Industry Favorite",
    rating: 4.92,
    reviewsCount: 2890,
    studentsCount: "41,000+",
    duration: "32+ Hours",
    level: "All Levels",
    instructor: "Er. Sumit Sharma (Principal Database Architect)",
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80",
    description: "Complete relational database theory, Normalization (1NF to BCNF), ACID properties, Transactions & Concurrency control, Indexing (B+ Trees), and Complex SQL queries.",
    features: [
      "100% Free Complete Lectures & Real DB Schema Demos",
      "Free SQL Cheat Sheets & Normalization Quick Guide",
      "Paid Sheet: 150 LeetCode SQL & System Query Problems with Solutions",
      "Verifiable Database Specialist Certificate"
    ],
    pricing: {
      classes: "FREE",
      notes: "FREE",
      sheetPrice: 119,
      originalPrice: 699,
      discount: "83% OFF",
      sheetTitle: "DBMS & SQL Interview Cracker Sheet (150 Queries + Code Solutions)"
    },
    lectures: [
      {
        id: "db-l1",
        title: "Lecture 1: ER Modeling, Relational Schema & Relational Algebra",
        duration: "45 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/ztHopE5Wnpc",
        description: "Entities, Cardinality ratios, foreign keys, Cartesian product, and Join operations.",
        isFree: true
      }
    ],
    notes: [
      {
        id: "db-n1",
        chapter: "Chapter 1: Normalization Rules & Candidate Key Discovery",
        content: `### 📊 Database Normalization Quick Guide
- **1NF:** Atomic values only.
- **2NF:** 1NF + No partial dependency.
- **3NF:** 2NF + No transitive dependency.
- **BCNF:** For every X -> Y, X must be a Super Key.`
      }
    ],
    practiceSheet: {
      title: "SQL & DBMS Interview Master Practice Sheet",
      totalQuestions: 150,
      rating: 4.93,
      solvedCount: "11,500+ Students Purchased",
      description: "150 Handcrafted questions: Window functions (DENSE_RANK), CTEs, self-joins, and transaction isolation.",
      questions: [
        {
          id: "db-q1",
          title: "Find Nth Highest Salary (With Dense Rank & Offset Solutions)",
          difficulty: "Medium",
          tags: ["SQL", "Window Functions"],
          companies: ["Google", "Amazon", "Flipkart"],
          isFreePreview: true,
          problemStatement: "Write an SQL query to report the nth highest salary from Employee table.",
          exampleInput: "For n = 2 in [100, 200, 300]",
          exampleOutput: "200",
          timeComplexity: "O(N log N)",
          spaceComplexity: "O(1)",
          solutionApproach: "Use DENSE_RANK() in a CTE to avoid ties.",
          solutions: {
            cpp: `// SQL Query (MySQL / PostgreSQL)
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk FROM Employee
) t WHERE rnk = 2 LIMIT 1;`,
            python: `# Pandas Solution
import pandas as pd
def nth_highest(df, n):
    s = df['salary'].drop_duplicates().nlargest(n)
    return s.iloc[-1] if len(s) >= n else None`,
            java: `// SQL Query
String sql = "SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET :offset";`
          }
        }
      ]
    },
    quiz: {
      passingPercentage: 70,
      questions: [
        {
          id: 1,
          question: "Which normal form requires removal of transitive dependencies?",
          options: ["1NF", "2NF", "3NF", "BCNF"],
          correctAnswer: 2,
          explanation: "3NF requires no transitive dependencies."
        }
      ]
    }
  },

  // 10. WEB DEV FULLSTACK (Existing)
  {
    id: "web-dev-fullstack",
    title: "Full Stack Web Development (MERN & Next.js)",
    category: "Web Development",
    badge: "High Placement Rate",
    rating: 4.88,
    reviewsCount: 3100,
    studentsCount: "52,000+",
    duration: "50+ Hours",
    level: "Beginner to Pro",
    instructor: "Vikram Singhania (Full Stack Tech Lead)",
    thumbnail: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=80",
    description: "Build production ready applications with React 19, Node.js, Express, MongoDB, Tailwind CSS, Next.js Server Components, and REST APIs.",
    features: [
      "100% Free Video Lectures & Real-World Projects",
      "Free Full-Stack Cheatsheets & Architecture Blueprints",
      "Paid Sheet: 130 Full-Stack React & Node System Coding Tasks + Solutions",
      "Verified Full Stack Developer Certificate"
    ],
    pricing: {
      classes: "FREE",
      notes: "FREE",
      sheetPrice: 149,
      originalPrice: 899,
      discount: "83% OFF",
      sheetTitle: "Full-Stack Senior Interview Coding Sheet (130 Questions + Code)"
    },
    lectures: [
      {
        id: "web-l1",
        title: "Lecture 1: Modern JavaScript ES6+, Closures & Event Loop",
        duration: "55 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/8aGhZQkoFbQ",
        description: "Call stack, Microtask Queue vs Task Queue, async/await, and prototypes.",
        isFree: true
      }
    ],
    notes: [
      {
        id: "web-n1",
        chapter: "Chapter 1: JavaScript Event Loop & Async Architecture",
        content: `### ⚡ JS Event Loop Architecture
1. Call Stack (LIFO)
2. Microtask Queue (Promises - high priority)
3. Task Queue (setTimeout, I/O)`
      }
    ],
    practiceSheet: {
      title: "Full Stack React & Node Coding Challenges",
      totalQuestions: 130,
      rating: 4.91,
      solvedCount: "9,800+ Students Purchased",
      description: "130 Coding assignments: debounce, throttle, custom promise, JWT auth middleware.",
      questions: [
        {
          id: "web-q1",
          title: "Implement Custom Debounce Function with Immediate Flag",
          difficulty: "Medium",
          tags: ["JavaScript", "Frontend"],
          companies: ["Meta", "Uber", "Atlassian"],
          isFreePreview: true,
          problemStatement: "Implement a debounce function in JavaScript that delays execution until wait ms have elapsed.",
          exampleInput: "const deb = debounce(fn, 300); deb(); deb();",
          exampleOutput: "Executes once after 300ms pause.",
          timeComplexity: "O(1)",
          spaceComplexity: "O(1)",
          solutionApproach: "Use closure with setTimeout and clearTimeout.",
          solutions: {
            cpp: `// TypeScript Debounce
function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}`,
            python: `# Python Debounce
import threading
def debounce(delay):
    def decorator(fn):
        timer = None
        def debounced(*args):
            nonlocal timer
            if timer: timer.cancel()
            timer = threading.Timer(delay, fn, args)
            timer.start()
        return debounced
    return decorator`,
            java: `// Java Debounce
import java.util.concurrent.*;
public class Debouncer {
    private final ScheduledExecutorService exec = Executors.newSingleThreadScheduledExecutor();
    private ScheduledFuture<?> future;
    public synchronized void debounce(Runnable task, long delayMs) {
        if (future != null) future.cancel(false);
        future = exec.schedule(task, delayMs, TimeUnit.MILLISECONDS);
    }
}`
          }
        }
      ]
    },
    quiz: {
      passingPercentage: 70,
      questions: [
        {
          id: 1,
          question: "Which queue has higher priority in JavaScript event loop?",
          options: ["Macrotask", "Microtask (Promises)", "Timer", "I/O"],
          correctAnswer: 1,
          explanation: "Microtasks are always drained before the next macrotask."
        }
      ]
    }
  },

  // 11. COMPUTER NETWORKS (Existing)
  {
    id: "computer-networks",
    title: "Computer Networks & Network Security",
    category: "Core Computer Science",
    badge: "Essential CS",
    rating: 4.82,
    reviewsCount: 1650,
    studentsCount: "27,400+",
    duration: "30+ Hours",
    level: "Intermediate",
    instructor: "Dr. K. R. Raman (Network Security Specialist)",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    description: "OSI & TCP/IP stack, Subnetting (CIDR), Routing protocols (OSPF, BGP), TCP 3-Way Handshake, DNS, HTTP/2/3, and SSL/TLS Handshake.",
    features: [
      "100% Free Full Lectures with Packet Demos",
      "Free Subnetting & Protocol Cheat Sheet",
      "Paid Sheet: 110 Networking & Socket Programming Problems with Code",
      "Verified Computer Networks Certificate"
    ],
    pricing: {
      classes: "FREE",
      notes: "FREE",
      sheetPrice: 99,
      originalPrice: 599,
      discount: "83% OFF",
      sheetTitle: "Computer Networks & Socket Coding Sheet (110 Questions + Code)"
    },
    lectures: [
      {
        id: "cn-l1",
        title: "Lecture 1: OSI 7-Layer vs TCP/IP Architecture",
        duration: "48 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
        description: "Data encapsulation, PDU at each layer, MAC vs IP addressing.",
        isFree: true
      }
    ],
    notes: [
      {
        id: "cn-n1",
        chapter: "Chapter 1: TCP vs UDP & Port Numbers Quick Lookup",
        content: `### 🌐 Transport Layer Protocols
- **TCP:** Connection-oriented, reliable delivery, 3-way handshake.
- **UDP:** Connectionless, fast, lightweight header.`
      }
    ],
    practiceSheet: {
      title: "Networking Protocol & Socket Programming Practice Sheet",
      totalQuestions: 110,
      rating: 4.88,
      solvedCount: "6,700+ Students Purchased",
      description: "Subnetting calculations, Socket programming in C++ / Python, Custom packet parser.",
      questions: [
        {
          id: "cn-q1",
          title: "Multi-threaded TCP Echo Server with Socket Programming",
          difficulty: "Medium",
          tags: ["Sockets", "TCP/IP"],
          companies: ["Cisco", "Cloudflare"],
          isFreePreview: true,
          problemStatement: "Implement a multi-threaded TCP Echo Server that handles concurrent incoming client connections.",
          exampleInput: "Client sends 'Hello'",
          exampleOutput: "Server replies 'Echo: Hello'",
          timeComplexity: "O(1)",
          spaceComplexity: "O(Threads)",
          solutionApproach: "Socket, bind, listen, accept, spawn thread.",
          solutions: {
            cpp: `// C++ Sockets
#include <iostream>
#include <netinet/in.h>
// POSIX socket server implementation`,
            python: `# Python Socket Server
import socket, threading
def handle(c):
    while True:
        d = c.recv(1024)
        if not d: break
        c.sendall(b"Echo: " + d)
s = socket.socket()
s.bind(('0.0.0.0', 8080))
s.listen(5)`,
            java: `// Java ServerSocket
import java.net.*;
ServerSocket s = new ServerSocket(8080);`
          }
        }
      ]
    },
    quiz: {
      passingPercentage: 70,
      questions: [
        {
          id: 1,
          question: "How many packets are exchanged in standard TCP teardown?",
          options: ["2", "3", "4 (FIN, ACK, FIN, ACK)", "1"],
          correctAnswer: 2,
          explanation: "TCP connection closure uses a 4-way handshake."
        }
      ]
    }
  },

  // 12. AI & MACHINE LEARNING (Existing)
  {
    id: "ai-machine-learning",
    title: "Artificial Intelligence & Applied Machine Learning",
    category: "AI & Data Science",
    badge: "Trending 2026",
    rating: 4.94,
    reviewsCount: 2400,
    studentsCount: "38,000+",
    duration: "40+ Hours",
    level: "Intermediate",
    instructor: "Dr. Aryan Kashyap (AI Research Scientist)",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80",
    description: "Foundational mathematics for AI, Linear Regression, Logistic Classification, Decision Trees, Neural Networks, PyTorch basics, and prompt engineering.",
    features: [
      "100% Free Complete Lectures & Colab Notebooks",
      "Free Math for ML Cheatsheet",
      "Paid Sheet: 100 ML System & Math Coding Problems with Solutions",
      "Verified AI/ML Practitioner Certificate"
    ],
    pricing: {
      classes: "FREE",
      notes: "FREE",
      sheetPrice: 199,
      originalPrice: 1199,
      discount: "83% OFF",
      sheetTitle: "Applied ML & Deep Learning Coding Sheet (100 Questions + Code)"
    },
    lectures: [
      {
        id: "ai-l1",
        title: "Lecture 1: Linear Algebra & Matrix Calculus for ML",
        duration: "52 mins",
        videoUrl: "https://www.youtube-nocookie.com/embed/fNk_zzaMoSs",
        description: "Eigenvalues, Matrix multiplication, Dot products, and Gradient vectors.",
        isFree: true
      }
    ],
    notes: [
      {
        id: "ai-n1",
        chapter: "Chapter 1: Gradient Descent & Loss Functions Cheat Sheet",
        content: `### 🧠 ML Core Math
\`\`\`
W = W - alpha * dL/dW
\`\`\`
- Alpha: Learning rate
- dL/dW: Gradient of loss`
      }
    ],
    practiceSheet: {
      title: "ML Math & Neural Network From Scratch Practice Sheet",
      totalQuestions: 100,
      rating: 4.96,
      solvedCount: "7,300+ Students Purchased",
      description: "Implement Linear Regression, K-Means, and MLP forward/backprop in Python NumPy.",
      questions: [
        {
          id: "ai-q1",
          title: "Implement Multi-Class Softmax and Cross-Entropy Loss with Backprop",
          difficulty: "Medium",
          tags: ["Machine Learning", "NumPy"],
          companies: ["OpenAI", "Google DeepMind", "NVIDIA"],
          isFreePreview: true,
          problemStatement: "Implement numerically stable Softmax activation and backprop gradient.",
          exampleInput: "logits = [[2.0, 1.0, 0.1]], labels = [0]",
          exampleOutput: "Softmax probs, gradient = probs - one_hot",
          timeComplexity: "O(N * C)",
          spaceComplexity: "O(N * C)",
          solutionApproach: "Subtract max value from logits before exp.",
          solutions: {
            cpp: `// C++ Softmax
#include <vector>
#include <cmath>
#include <algorithm>
using namespace std;
// Stable softmax in C++`,
            python: `# Python NumPy Stable Softmax
import numpy as np
def stable_softmax(logits):
    shifted = logits - np.max(logits, axis=-1, keepdims=True)
    exp_vals = np.exp(shifted)
    return exp_vals / np.sum(exp_vals, axis=-1, keepdims=True)`,
            java: `// Java Softmax
public class MLUtils { /* Softmax in Java */ }`
          }
        }
      ]
    },
    quiz: {
      passingPercentage: 70,
      questions: [
        {
          id: 1,
          question: "Why do we subtract max(logits) in softmax computation?",
          options: ["Normalize to 100", "Prevent floating-point numerical overflow with large exponents", "Make output negative", "GPU memory"],
          correctAnswer: 1,
          explanation: "Large exponents e^1000 cause 64-bit float overflow to infinity. Subtracting max bounds exponents to <= 0."
        }
      ]
    }
  }
];
