#lang racket
(define zero (lambda (f)
  (lambda (x) x)))
(define (add-1 n)
  (lambda (f) (lambda (x) (f ((n f) x)))))
(define (church-add m n)
  (lambda (f) (lambda (x) ((m f)((n f) x)))))
(define (church-mul m n)
  (lambda (f) (lambda (x) ((m (n f)) x))))
(define count-from-zero (lambda (x) (+ x 1)))
(define one (lambda (f)
              (lambda (x) (f x))))
(define two (lambda (f)
              (lambda (x) (f(f x)))))
(define three (lambda (f)
              (lambda (x) (f(f (f x))))))