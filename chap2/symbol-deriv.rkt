#lang racket
(define (equal? a b)
  (cond ((and (null? a) (null? b)) #t)
        ((or (null? a) (null? b)) #f)
        ((and (pair? (car a)) (pair? (car b))) (equal? (car a) (car b)))
        ((and (pair? (car a)) (not (pair? (car b)))) #f)
        ((and (not (pair? (car a))) (pair? (car b))) #f)
        ((eq? (car a) (car b)) (equal? (cdr a) (cdr b)))
        (else #f)))
(define variable? symbol?)
(define (sum? exp)
  (and (pair? exp) (eq? (car exp) '+)))
(define (product? exp)
  (and (pair? exp) (eq? (car exp) '*)))
(define (exponent? exp)
  (and (pair? exp) (eq? (car exp) '**)))
(define (number=? x val)
  (and (number? x) (= x val)))
(define (make-sum a b)
  (cond ((number=? a 0) b)
        ((number=? b 0) a)
  (else (list '+ a b))))
(define (make-product a b)
  (cond ((or (number=? a 0) (number=? b 0)) 0)
        ((number=? a 1) b)
        ((number=? b 1) a)
  (else (list '* a b))))
(define (make-exponent b e)
  (cond ((number=? b 0) 0)
        ((number=? e 0) 1)
        ((number=? e 1) b)
        (else (list '** b e))))
(define (make-sub a b)
  (cond ((and (number? a) (number? b) (- a b)))
        ((number=? b 0) a)
        (else (list '- a b))))
(define (deriv exp variable)
  (cond ((sum? exp)
         (make-sum
                      (deriv (cadr exp) variable)
                      (deriv (caddr exp) variable)))
        ((product? exp) (make-sum
                         (make-product (cadr exp) (deriv (caddr exp) variable))
                         (make-product (caddr exp) (deriv (cadr exp) variable))))
        ((exponent? exp) (make-product (caddr exp) (make-exponent (cadr exp) (make-sub (caddr exp) 1))))
        ((number? exp) 0)
        ((and (variable? exp) (not (eq? exp variable))) 0)
        ((and (variable? exp) (eq? exp variable)) 1)
        (else (error "todo"))))
(define (element-of-set? x set)
  (cond ((null? set) #f)
        ((eq? (car set) x) #t)
        (else (element-of-set? x (cdr set)))))
(define (adjoin-set x set)
  (if (element-of-set? x set)
      set
      (cons x set)))
(define (intersection-set set1 set2)
  (cond ((null? set1) '())
        ((element-of-set? (car set1) set2) (cons (car set1) (intersection-set (cdr set1) set2)))
        (else (intersection-set (cdr set1) set2))))
