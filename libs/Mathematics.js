
(function() {
	
	Mathematics = {
	
		PI1_2   : 1.5707963267948966,
		PI      : 3.14159265358979,
		TAU     : 6.283185307179586,
		SQRT1_2 : 0.7071067811865476,
		SQRT2   : 1.4142135623730951,
		SQRT3   : 1.7320508075688772,
		SQRT5   : 2.2360679774997896,
		E       : 2.718281828459045,
		LN10    : 2.302585092994046,
		LN2     : 0.6931471805599453,
		LOG10E  : 0.4342944819032518,
		LOG2E   : 1.4426950408889634,
	
		Neg: function(value) {
			if (Mathematics.Sign(value) == 0 || Mathematics.Sign(value) == -1) {
				return value;
			} else {
				return value*-1;
			}
		},
		
		Sign: function(value) {
			return value > 0 ? 1 : value < 0 ? -1 : 0;
		},
		
		SignFlip: function(value) {
			return value * -1;
		},
		
		SignRandom: function() {
			if (Math.random()*1 > 0.5) {
				return 1;
			} else {
				return -1;
			}
		},
		
		SignEqual: function(valueA, valueB) {
			if ((valueA == 0 && valueB != 0) || (valueA != 0 && valueB == 0)) { return false; }
			return !((valueA ^ valueB) < 0);
		},
		
		Degrees2Radians: function(value) {
			return value * (Mathematics.PI / 180.0);
		},

		Radians2Degrees: function(value) {
			return value * (180.0 / Mathematics.PI);
		},
		
		Difference: function(valueA, valueB) {
			return Math.abs(valueA - valueB);
		},
		
		// keep the decimal
		Shear: function(value) {
			return value % 1;
		},
	
		DivSafe: function(valueA, valueB) {
			if (valueB >= 0 && valueB <= 0) {
				return (valueA / valueB);
			} else {
				return 0;
			}
		},
		
		ModSafe: function(valueA, valueB) {
			if (valueB >= 0 && valueB <= 0) {
				return (valueA % valueB);
			} else {
				return 0;
			}
		},
	
		// get rid of decimals, no round
		Truncate: function(value) {
			return ((value > 0) ? Math.floor(value) : Math.ceil(value));
		},
		
		IsOdd: function(value) {
			return (value % 2) > 0.5? true : false;
		},
		
		IsEven: function(value) {
			return (value % 2) > 0.5? false : true;
		},
	
		Wrap: function(value, minimum, maximum) {

			var range = maximum - minimum;
			
			if (range <= 0) {
				return 0;
			}
			
			var result = (value - minimum) % range;

			if (result < 0) {
				result += range;
			}
			
			return result + minimum;
			
		},
		
		Clamp: function(value, minimum, maximum) {
			return Math.min(Math.max(value, minimum), maximum);
		},
		
		Percent: function(value, totalModifier = 100) {
			return ((value / totalModifier)*100);
		},
		
		IsDivisible: function(value, divisibleBy) {
			return (value % divisibleBy == 0) ? 1 : 0;
		},
		
		IsPowerOf2: function(value) {
			return (value != 0) && ((value & (value - 1)) == 0);
		},
		
		RangeMap: function(value, a1, a2, b1, b2) {
			return b1 + (value - a1) * (b2 - b1) / (a2 - a1);
		},
		
		Lerp: function(t, a, b) {
			return (a+t*(b-a));
		},
		
		Smoothstep: function(minimum, maximum, value) {
			value = Math.max(0, Math.min(1, (value - minimum) / (maximum - minimum)));
			return value * value * (3 - 2 * value);
		},
	
		Boxstep: function(a, b, x) {
			
			var step;
			
			if (a == b) { 
				return -1;
			}
			
			step = (x - a) / (b - a);

			if (step <= 0) {
				return 0;
			}

			if (step >= 1) {
				return 1;
			}

			return step;
		},
		
		AddMax: function(value, valueAdd, maximum) {

			value += valueAdd;

			if (value > maximum) {
				value = maximum;
			}

			return value;
		},
		
		SubMin: function(value, valueSubtract, minimum) {
			
			value -= valueSubtract;
			
			if (value < minimum) {
				value = minimum;
			}

			return value;
		},
		
		MultiMax: function(value, valueMultiply, maximum) {
		
			value *= valueMultiply;

			if (value > maximum) {
				value = maximum;
			}

			return value;
		},
	
		DivMin: function(value, valueDiv, minimum) {

			if (valueDiv >= 0 && valueDiv <= 0) {

				value /= valueDiv;
				
				if (value < minimum) {
					value = minimum;
				}

			} else {
				return 0;
			}

			return value;
		},
	
		RandomRange: function(minimum, maximum) {
			return Math.random() * (maximum - minimum) + minimum;
		},

		RandomRangeInt: function(minimum, maximum) {
			return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
		},
		
		AngleDifference: function(angleA, angleB) {
			return (((((angleA - angleB) % 360) + 540) % 360) - 180);
		},
		
		AngleLerp: function(a, b, t) {
			return (((((b - a) % 360) + 540) % 360) - 180)*t;
		}
	
	};
	
	module.exports = Mathematics;
	
})();

