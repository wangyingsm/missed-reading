#lang racket/base
(require compatibility/mlist)
(define (last-pair x)
  (if (null? (mcdr x))
      x
      (last-pair (mcdr x))))
(define (append! x y)
  (set-mcdr! (last-pair x) y)
  x)
(define (make-cycle x)
  (set-mcdr! (last-pair x) x)
  x)
(define (mystery x)
  (define (loop x y)
    (if (null? x)
        y
        (let ((temp (mcdr x)))
          (set-mcdr! x y)
          (loop temp x))))
  (loop x '()))
(define (make-queue)
  (mcons '() '()))
(define (empty-queue? q)
  (null? (mcar q)))
(define (front-queue q)
  (if (empty-queue? q)
      (error "empty queue")
      (mcar (mcar q))))
(define (insert-queue q item)
  (let ((node (mlist item)))
    (if (empty-queue? q)
        (begin (set-mcar! q node) (set-mcdr! q node))
        (begin (set-mcdr! (mcdr q) node)
               (set-mcdr! q node)))))
(define (delete-queue q)
  (let ((node (mcar q)))
    (if (empty-queue? q)
        (begin (set-mcdr! q '())
               (error "empty queue"))
        (begin (set-mcar! q (mcdr node))
        (mcar node)))))
        