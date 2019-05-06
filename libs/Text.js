
(function() {
	
	Text = {
	
		Random: function(maxCharacters, CharacterSet = undefined) {
			
			if (CharacterSet == undefined) {
				CharacterSet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", 
				"Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", 
				"j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
			}
			
			CharacterSet.sort(function (a, b) { if (Math.random() < 0.5) { return -1; } else { return 1; } });
			
			return this.Join(CharacterSet, "").substr(0, maxCharacters);
			
		},
		
		Shuffle: function(text) {
			
			var out       = "";
			var strLength = 0;
			var i         = 0;
			
			while (text.length > 0) {
				strLength = text.length;
				i = Math.floor(Math.random()*strLength);
				out += text.charAt(i);
				text = text.substr(0, i) + text.substr(i+1);
				
			}
			
			return out;
		},
		
		Reverse: function(text) {
			var out = text.split("");
			out.reverse();
			return out.join("");
		},
		
		TrimLeft: function(text, characterSet = " ") {
			return text.replace(new RegExp("^"+characterSet+"+", ""), "");
		},

		TrimRight: function(text, characterSet = " ") {
			return text.replace(new RegExp(""+characterSet+"+$", ""), "");
		},

		Trim: function(text, characterSet = " ") {
			return text.replace(new RegExp("^"+characterSet+"+|"+characterSet+"+$", "g"), "");
		}
	
	};
	
	module.exports = Text;
	
})();

