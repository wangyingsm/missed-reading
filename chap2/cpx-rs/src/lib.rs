use std::ops::Add;

#[derive(Debug, Copy, Clone)]
pub enum Complex {
    Axis { x: f64, y: f64 },
    Polar { r: f64, a: f64 },
}

impl Complex {
    pub fn new(param1: f64, param2: f64, is_polar: bool) -> Self {
        if is_polar {
            Self::Polar {
                r: param1,
                a: param2,
            }
        } else {
            Self::Axis {
                x: param1,
                y: param2,
            }
        }
    }

    pub fn to_polar(&self) -> Self {
        match self {
            Complex::Axis { x, y } => Self::Polar {
                r: (x * x + y * y).sqrt(),
                a: (y / x).atan(),
            },
            Complex::Polar { .. } => *self,
        }
    }

    pub fn to_axis(&self) -> Self {
        match self {
            Complex::Axis { .. } => *self,
            Complex::Polar { r, a } => Self::Axis {
                x: r * a.cos(),
                y: r * a.sin(),
            },
        }
    }
}

impl Add for Complex {
    type Output = Self;

    fn add(self, rhs: Self) -> Self::Output {
        match (self, rhs) {
            (Self::Axis { x: x1, y: y1 }, Self::Axis { x: x2, y: y2 }) => Self::Axis {
                x: x1 + x2,
                y: y1 + y2,
            },
            (Self::Axis { .. }, Self::Polar { .. }) => self + rhs.to_axis(),
            (Self::Polar { .. }, Self::Axis { .. }) => self.to_axis() + rhs,
            (Self::Polar { .. }, Self::Polar { .. }) => self.to_axis() + rhs.to_axis(),
        }
    }
}
