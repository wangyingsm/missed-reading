#lang racket
(define (cons x y)
  (lambda (m) (m x y)))
(define (car c)
  (c (lambda (x y) x)))
(define (cdr c)
  (c (lambda (x y) y)))