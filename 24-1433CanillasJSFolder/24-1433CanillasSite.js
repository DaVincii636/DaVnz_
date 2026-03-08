/* ============================================================
   24-1433CanillasSite.js
   Project: DaVnz
   Student: Vincent Martin Torres Canillas | 24-1433
   2nd Year BSIT | 2nd Sem AY 2025-2026 | QCU
   Real Java execution via Piston API (emkc.org + piston.rodeo fallback)
   ============================================================ */

'use strict';

/* ============================================================
   THEME TOGGLE
   ============================================================ */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
let isDark = localStorage.getItem('davnz-theme') === 'dark';

function applyTheme(dark) {
  isDark = dark;
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeToggle.innerHTML = dark ? '<span>&#9728;</span> Light' : '<span>&#9790;</span> Dark';
  localStorage.setItem('davnz-theme', dark ? 'dark' : 'light');
}
applyTheme(isDark);
themeToggle.addEventListener('click', () => applyTheme(!isDark));

/* ============================================================
   TYPEWRITER ANIMATION
   ============================================================ */
const typewriterEl = document.getElementById('typewriterText');
const typeRoles = [
  'UI/UX Designer.',
  'Java Developer.',
  'Web Developer.',
  'BSIT Student.',
  'Problem Solver.',
  'Creative Thinker.',
];

let roleIdx   = 0;
let charIdx   = 0;
let isDeleting = false;
let typeDelay  = 120;

function typeLoop() {
  const current = typeRoles[roleIdx];

  if (!isDeleting) {
    typewriterEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    typeDelay = 100;
    if (charIdx === current.length) {
      typeDelay  = 1800;   // pause at end
      isDeleting = true;
    }
  } else {
    typewriterEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    typeDelay = 55;
    if (charIdx === 0) {
      isDeleting = false;
      roleIdx    = (roleIdx + 1) % typeRoles.length;
      typeDelay  = 320;
    }
  }

  setTimeout(typeLoop, typeDelay);
}

// Start after hero animation settles
setTimeout(typeLoop, 1100);

/* ============================================================
   NAVBAR — active link on scroll
   ============================================================ */
const allSections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

const allBottomItems = document.querySelectorAll('.bottom-nav-item');

function updateActiveNav() {
  const scrollY = window.scrollY + 140;
  allSections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      allNavLinks.forEach(a => a.classList.remove('active'));
      allBottomItems.forEach(a => a.classList.remove('active'));
      const match = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
      if (match) match.classList.add('active');
      const bmatch = document.querySelector(`.bottom-nav-item[href="#${sec.id}"]`);
      if (bmatch) bmatch.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ============================================================
   HELPER
   ============================================================ */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ============================================================
   BACKEND URL — change this after you deploy to Render!
   While testing locally: 'http://localhost:3000'
   After deploying:       'https://YOUR-APP-NAME.onrender.com'
   ============================================================ */
const BACKEND_URL = 'https://davnz-backend.onrender.com';
const SAMPLES = {

  /* ---- SECTION 1: BASIC INPUT / OUTPUT ---- */
  bio: [
    {
      title: 'Hello User',
      desc: 'Asks the user to enter their name using Scanner, then greets them with a personalized welcome message.',
      stdin: 'Vincent',
      code:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter your name: ");
        String name = sc.nextLine();

        System.out.println("Hello, " + name + "! Welcome!");
        sc.close();
    }
}`
    },
    {
      title: 'Simple Addition',
      desc: 'Reads two numbers from the user and displays their sum using basic arithmetic operations.',
      stdin: '15\n25',
      code:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter first number: ");
        double a = sc.nextDouble();

        System.out.print("Enter second number: ");
        double b = sc.nextDouble();

        System.out.println("Sum: " + (a + b));
        sc.close();
    }
}`
    },
    {
      title: 'Temperature Converter',
      desc: 'Converts a Celsius input to Fahrenheit, then converts it back — demonstrating both temperature formulas.',
      stdin: '100',
      code:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter temperature in Celsius: ");
        double celsius = sc.nextDouble();

        double fahrenheit = (celsius * 9.0 / 5.0) + 32;
        System.out.printf("%.2f C = %.2f F%n", celsius, fahrenheit);

        double backToC = (fahrenheit - 32) * 5.0 / 9.0;
        System.out.printf("%.2f F = %.2f C%n", fahrenheit, backToC);

        sc.close();
    }
}`
    },
    {
      title: 'BMI Calculator',
      desc: 'Computes Body Mass Index from weight and height, then prints the corresponding health category.',
      stdin: '70\n1.75',
      code:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter weight (kg): ");
        double weight = sc.nextDouble();

        System.out.print("Enter height (m): ");
        double height = sc.nextDouble();

        double bmi = weight / (height * height);
        System.out.printf("BMI: %.2f%n", bmi);

        if      (bmi < 18.5) System.out.println("Category: Underweight");
        else if (bmi < 25.0) System.out.println("Category: Normal weight");
        else if (bmi < 30.0) System.out.println("Category: Overweight");
        else                 System.out.println("Category: Obese");

        sc.close();
    }
}`
    },
    {
      title: 'ASCII Value',
      desc: 'Reads a single character from input and displays its ASCII numeric value using a type cast.',
      stdin: 'A',
      code:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a character: ");
        char ch = sc.next().charAt(0);

        System.out.println("Character  : " + ch);
        System.out.println("ASCII Value: " + (int) ch);

        sc.close();
    }
}`
    }
  ],

  /* ---- SECTION 2: VARIABLES & DATA TYPES ---- */
  vars: [
    {
      title: 'Age Category Variable',
      desc: 'Stores the user\'s age in an int and assigns a category String based on the age range using if-else.',
      stdin: '20',
      code:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter your age: ");
        int age = sc.nextInt();

        String category;
        if      (age < 13) category = "Child";
        else if (age < 18) category = "Teenager";
        else if (age < 60) category = "Adult";
        else               category = "Senior";

        System.out.println("Age      : " + age);
        System.out.println("Category : " + category);

        sc.close();
    }
}`
    },
    {
      title: 'Square and Cube',
      desc: 'Reads a number and stores its square and cube in separate double variables, then prints all three values.',
      stdin: '5',
      code:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a number: ");
        double num = sc.nextDouble();

        double square = num * num;
        double cube   = num * num * num;

        System.out.println("Number : " + num);
        System.out.println("Square : " + square);
        System.out.println("Cube   : " + cube);

        sc.close();
    }
}`
    },
    {
      title: 'Greater Than Check',
      desc: 'Stores comparison results in boolean variables and prints a truth table for >, <, and == operators.',
      stdin: '10\n5',
      code:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter first number: ");
        double a = sc.nextDouble();

        System.out.print("Enter second number: ");
        double b = sc.nextDouble();

        boolean aGreater = a > b;
        boolean bGreater = b > a;
        boolean equal    = a == b;

        System.out.println("--- Truth Table ---");
        System.out.println(a + " > "  + b + " : " + aGreater);
        System.out.println(b + " > "  + a + " : " + bGreater);
        System.out.println(a + " == " + b + " : " + equal);

        sc.close();
    }
}`
    },
    {
      title: 'User Profile',
      desc: 'Demonstrates four data types — String, int, double, and boolean — to build and display a user profile.',
      stdin: 'Vincent\n20\n1.50',
      code:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter name: ");
        String name = sc.nextLine();

        System.out.print("Enter age: ");
        int age = sc.nextInt();

        System.out.print("Enter GPA: ");
        double gpa = sc.nextDouble();

        boolean isStudent = true;

        System.out.println("\\n=== User Profile ===");
        System.out.println("Name       : " + name);
        System.out.println("Age        : " + age);
        System.out.printf ("GPA        : %.2f%n", gpa);
        System.out.println("Is Student : " + isStudent);

        sc.close();
    }
}`
    },
    {
      title: 'Time Converter',
      desc: 'Converts total minutes into hours and remaining minutes using integer division (/) and modulo (%) operators.',
      stdin: '135',
      code:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter total minutes: ");
        int totalMinutes = sc.nextInt();

        int hours   = totalMinutes / 60;
        int minutes = totalMinutes % 60;

        System.out.println(totalMinutes + " minutes = "
            + hours + " hour(s) and "
            + minutes + " minute(s)");

        sc.close();
    }
}`
    }
  ],

  /* ---- SECTION 3: CONDITIONAL STATEMENTS ---- */
  conditionals: [
    {
      title: 'Even or Odd',
      desc: 'Uses the modulo operator inside an if-else statement to determine whether a number is even or odd.',
      stdin: '7',
      code:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a number: ");
        int num = sc.nextInt();

        if (num % 2 == 0) {
            System.out.println(num + " is Even");
        } else {
            System.out.println(num + " is Odd");
        }

        sc.close();
    }
}`
    },
    {
      title: 'Pass or Fail',
      desc: 'Checks if the marks entered are 50 or above and prints PASS or FAIL accordingly using an if-else statement.',
      stdin: '75',
      code:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter marks (0-100): ");
        int marks = sc.nextInt();

        System.out.println("Marks  : " + marks);

        if (marks >= 50) {
            System.out.println("Result : PASS");
        } else {
            System.out.println("Result : FAIL");
        }

        sc.close();
    }
}`
    },
    {
      title: 'Largest of Two Numbers',
      desc: 'Compares two numbers with an if-else-if chain and prints which one is larger, or if both are equal.',
      stdin: '42\n17',
      code:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter first number: ");
        double a = sc.nextDouble();

        System.out.print("Enter second number: ");
        double b = sc.nextDouble();

        if (a > b) {
            System.out.println(a + " is larger than " + b);
        } else if (b > a) {
            System.out.println(b + " is larger than " + a);
        } else {
            System.out.println("Both numbers are equal: " + a);
        }

        sc.close();
    }
}`
    },
    {
      title: 'Simple Login System',
      desc: 'Validates username and password against stored credentials using .equals() inside a compound if condition.',
      stdin: 'admin\n1234',
      code:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        final String CORRECT_USER = "admin";
        final String CORRECT_PASS = "1234";

        System.out.print("Enter username: ");
        String username = sc.nextLine();

        System.out.print("Enter password: ");
        String password = sc.nextLine();

        if (username.equals(CORRECT_USER) && password.equals(CORRECT_PASS)) {
            System.out.println("Login Successful! Welcome, " + username + "!");
        } else {
            System.out.println("Login Failed! Invalid credentials.");
        }

        sc.close();
    }
}`
    },
    {
      title: 'Simple Calculator',
      desc: 'Performs +, -, *, or / on two numbers using a switch statement based on the operator character entered.',
      stdin: '10\n+\n5',
      code:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter first number: ");
        double a = sc.nextDouble();

        System.out.print("Enter operator (+, -, *, /): ");
        char op = sc.next().charAt(0);

        System.out.print("Enter second number: ");
        double b = sc.nextDouble();

        switch (op) {
            case '+': System.out.printf("Result: %.2f%n", a + b); break;
            case '-': System.out.printf("Result: %.2f%n", a - b); break;
            case '*': System.out.printf("Result: %.2f%n", a * b); break;
            case '/':
                if (b != 0) System.out.printf("Result: %.2f%n", a / b);
                else        System.out.println("Error: Division by zero!");
                break;
            default: System.out.println("Invalid operator!");
        }

        sc.close();
    }
}`
    }
  ],

  /* ---- SECTION 4: LOOPS ---- */
  loops: [
    {
      title: 'Print 1 to 10',
      desc: 'Uses a for loop to iterate from 1 to 10 and prints each number separated by dashes on the same line.',
      stdin: '',
      code:
`public class Main {
    public static void main(String[] args) {
        System.out.println("Numbers from 1 to 10:");

        for (int i = 1; i <= 10; i++) {
            System.out.print(i);
            if (i < 10) System.out.print(" - ");
        }

        System.out.println();
        System.out.println("Done!");
    }
}`
    },
    {
      title: 'Sum of First N Numbers',
      desc: 'Uses a for loop to accumulate the sum of all integers from 1 up to N entered by the user.',
      stdin: '10',
      code:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter N: ");
        int n = sc.nextInt();

        int sum = 0;
        for (int i = 1; i <= n; i++) {
            sum += i;
        }

        System.out.println("Sum of first " + n + " numbers = " + sum);
        sc.close();
    }
}`
    },
    {
      title: 'Multiplication Table',
      desc: 'Generates the complete multiplication table of a number from 1 to 10 using a for loop.',
      stdin: '7',
      code:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a number: ");
        int num = sc.nextInt();

        System.out.println("Multiplication Table of " + num + ":");
        System.out.println("----------------------------");

        for (int i = 1; i <= 10; i++) {
            System.out.printf("%d x %2d = %d%n", num, i, num * i);
        }

        sc.close();
    }
}`
    },
    {
      title: 'Number Guessing Game',
      desc: 'Uses a do-while loop to keep asking the user to guess the secret number until they get it correct.',
      stdin: '3\n5\n7',
      code:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int secret = 7;
        int guess;
        int attempts = 0;

        System.out.println("Guess the secret number (between 1-10):");

        do {
            System.out.print("Your guess: ");
            guess = sc.nextInt();
            attempts++;

            if (guess != secret) {
                System.out.println("Wrong! Try again.");
            }
        } while (guess != secret);

        System.out.println("You're correct! The number was " + secret + "!");
        System.out.println("You got it in " + attempts + " attempt(s).");

        sc.close();
    }
}`
    },
    {
      title: 'Factorial Calculator',
      desc: 'Computes the factorial of N using a for loop, multiplying each integer from 1 to N stored in a long.',
      stdin: '6',
      code:
`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a number: ");
        int n = sc.nextInt();

        long factorial = 1;

        for (int i = 1; i <= n; i++) {
            factorial *= i;
        }

        System.out.println(n + "! = " + factorial);
        sc.close();
    }
}`
    }
  ]
};

/* ============================================================
   RENDER SECTIONS — tabs + cards
   ============================================================ */
function renderSection(key, containerId) {
  const data      = SAMPLES[key];
  const container = document.getElementById(containerId);
  const tabNav    = container.querySelector('.tab-nav');
  const cardsWrap = container.querySelector('.cards-container');

  /* ── Dropdown (mobile) ── */
  const selectWrap = document.createElement('div');
  selectWrap.className = 'tab-select-wrap';
  const select = document.createElement('select');
  select.className = 'tab-select';
  select.setAttribute('aria-label', 'Select sample');
  selectWrap.appendChild(select);
  tabNav.parentNode.insertBefore(selectWrap, tabNav);

  data.forEach((sample, idx) => {
    /* Tab button */
    const btn = document.createElement('button');
    btn.className   = 'tab-btn' + (idx === 0 ? ' active' : '');
    btn.textContent = `${idx + 1}. ${sample.title}`;
    btn.addEventListener('click', () => {
      tabNav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      cardsWrap.querySelectorAll('.sample-card').forEach(c => c.classList.remove('active'));
      cardsWrap.querySelectorAll('.sample-card')[idx].classList.add('active');
    });
    tabNav.appendChild(btn);

    /* Dropdown option */
    const opt = document.createElement('option');
    opt.value       = idx;
    opt.textContent = `${idx + 1}. ${sample.title}`;
    select.appendChild(opt);

    /* Sample card */
    const card = document.createElement('div');
    card.className = 'sample-card' + (idx === 0 ? ' active' : '');
    card.innerHTML = `
      <div class="sample-header">
        <div class="sample-title">${sample.title}</div>
        <div class="sample-desc">${sample.desc}</div>
      </div>
      <div class="code-panel">
        <div class="code-panel-header">
          <div class="code-dots">
            <span class="dot-red"></span>
            <span class="dot-yellow"></span>
            <span class="dot-green"></span>
          </div>
          <span class="code-lang">JAVA</span>
          <button class="copy-btn">Copy</button>
        </div>
        <pre>${esc(sample.code)}</pre>
      </div>
      <div class="try-btn-wrap">
        <button class="try-btn">&#9654; Try it Yourself</button>
      </div>
    `;

    /* Copy button */
    const copyBtn = card.querySelector('.copy-btn');
    copyBtn.addEventListener('click', () => {
      const fallback = () => {
        const ta = document.createElement('textarea');
        ta.value = sample.code;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(sample.code).catch(fallback);
      } else {
        fallback();
      }
      copyBtn.textContent = '✓ Copied!';
      copyBtn.classList.add('copied');
      setTimeout(() => { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('copied'); }, 2200);
    });

    /* Try it Yourself button */
    card.querySelector('.try-btn').addEventListener('click', () => openModal(sample));

    cardsWrap.appendChild(card);
  });

  /* Dropdown change → switch active card + sync tab buttons */
  select.addEventListener('change', () => {
    const i = parseInt(select.value);
    tabNav.querySelectorAll('.tab-btn').forEach((b, bi) => b.classList.toggle('active', bi === i));
    cardsWrap.querySelectorAll('.sample-card').forEach((c, ci) => c.classList.toggle('active', ci === i));
  });
}

renderSection('bio',          'section-bio');
renderSection('vars',         'section-vars');
renderSection('conditionals', 'section-conditionals');
renderSection('loops',        'section-loops');

/* ============================================================
   MODAL DOM REFERENCES
   ============================================================ */
const modalOverlay = document.getElementById('modalOverlay');
const modalTitleEl = document.getElementById('modalTitle');
const codeEditor   = document.getElementById('codeEditor');
const stdinInput   = document.getElementById('stdinInput');
const outputPanel  = document.getElementById('outputPanel');
const runBtn       = document.getElementById('runBtn');
const clearBtn     = document.getElementById('clearBtn');
const modalClose   = document.getElementById('modalClose');
const statusDot    = document.getElementById('statusDot');
const statusText   = document.getElementById('statusText');
const modalLeft    = document.querySelector('.modal-left');
const modalRight   = document.querySelector('.modal-right');
const mobTabCode   = document.getElementById('mobTabCode');
const mobTabOutput = document.getElementById('mobTabOutput');

/* Mobile tab switching */
function setMobTab(tab) {
  if (tab === 'code') {
    modalLeft.classList.add('mob-active');
    modalRight.classList.remove('mob-active');
    mobTabCode.classList.add('active');
    mobTabOutput.classList.remove('active');
  } else {
    modalRight.classList.add('mob-active');
    modalLeft.classList.remove('mob-active');
    mobTabOutput.classList.add('active');
    mobTabCode.classList.remove('active');
  }
}

mobTabCode  .addEventListener('click', () => setMobTab('code'));
mobTabOutput.addEventListener('click', () => setMobTab('output'));

/* ============================================================
   MODAL — OPEN / CLOSE
   ============================================================ */
function openModal(sample) {
  modalTitleEl.innerHTML = `Try it Yourself &mdash; <span>${sample.title}</span>`;
  codeEditor.value       = sample.code;
  stdinInput.value       = sample.stdin;
  setOutput('placeholder', 'Click \u25B6 Run Code to execute your Java program...');
  setStatus('idle', 'Ready');
  setMobTab('code');
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => codeEditor.focus(), 100);
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ============================================================
   OUTPUT & STATUS HELPERS
   ============================================================ */
function setOutput(type, content) {
  if (type === 'placeholder') {
    outputPanel.innerHTML = `<span class="out-placeholder">${content}</span>`;
  } else if (type === 'error') {
    outputPanel.innerHTML = `<span class="out-error">${esc(content)}</span>`;
  } else if (type === 'warn') {
    outputPanel.innerHTML = `<span class="out-warn">${esc(content)}</span>`;
  } else {
    outputPanel.innerHTML = `<span class="out-success">${esc(content)}</span>`;
  }
}

function setStatus(state, text) {
  statusDot.className = 'status-dot';
  if (state === 'running') statusDot.classList.add('running');
  if (state === 'success') statusDot.classList.add('success');
  if (state === 'error')   statusDot.classList.add('error');
  statusText.textContent = text;
}

/* ============================================================
   RUN CODE — calls Node.js backend → JDoodle
   Change BACKEND_URL at the top of this file after deploying!
   ============================================================ */
runBtn.addEventListener('click', async () => {
  const code  = codeEditor.value.trim();
  const stdin = stdinInput.value;

  if (!code) {
    setOutput('warn', 'Editor is empty. Please paste or type some Java code first.');
    return;
  }

  runBtn.disabled   = true;
  runBtn.innerHTML  = '<span class="spinner"></span> Running...';
  clearBtn.disabled = true;

  setOutput('placeholder', '&#9203; Sending to compiler...');
  setStatus('running', 'Executing...');

  /* On mobile, auto-switch to output tab */
  if (window.innerWidth <= 680) setMobTab('output');

  try {
    const response = await fetch(`${BACKEND_URL}/execute`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ script: code, stdin })
    });

    const data = await response.json();

    if (data.error) {
      setOutput('error', '⚠  Error:\n\n' + data.error);
      setStatus('error', 'Error');
    } else if (data.exitCode !== 0) {
      setOutput('error', '⚠  ' + data.output);
      setStatus('error', 'Runtime Error');
    } else {
      setOutput('success', data.output);
      setStatus('success', `Done \u00B7 ${data.cpuTime}s`);
    }

  } catch (err) {
    setOutput('error',
      '⚠  Could not reach the backend server.\n\n' +
      'If testing locally, make sure you ran: node server.js\n' +
      'If deployed, check your BACKEND_URL is correct.\n\n' +
      'Error: ' + err.message
    );
    setStatus('error', 'Network Error');
  }

  runBtn.disabled   = false;
  runBtn.innerHTML  = '&#9654; Run Code';
  clearBtn.disabled = false;
});

/* ============================================================
   CLEAR OUTPUT
   ============================================================ */
clearBtn.addEventListener('click', () => {
  setOutput('placeholder', 'Output cleared. Click \u25B6 Run Code to execute again.');
  setStatus('idle', 'Ready');
});

/* ============================================================
   KEYBOARD SHORTCUTS
   Ctrl+Enter → Run Code
   Tab        → Insert 4 spaces
   ============================================================ */
codeEditor.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    if (!runBtn.disabled) runBtn.click();
  }
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = codeEditor.selectionStart;
    const end   = codeEditor.selectionEnd;
    codeEditor.value =
      codeEditor.value.substring(0, start) + '    ' + codeEditor.value.substring(end);
    codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
  }
});
