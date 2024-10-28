#lang racket
(define (length l)
  (if (null? l)
      0
      (+ 1 (length (cdr l)))))
(define (append l1 l2)
  (if (null? l1)
      l2
      (cons (car l1) (append (cdr l1) l2))))
(define (map proc l)
  (if (null? l)
      '()
      (cons (proc (car l)) (map proc (cdr l)))))
(define (filter predicate l)
  (cond ((null? l) '())
        ((predicate (car l)) (cons (car l) (filter predicate (cdr l))))
        (else (filter predicate (cdr l)))))
(define (accumulate op initial l)
  (if (null? l)
      initial
      (accumulate op (op initial (car l)) (cdr l))))
