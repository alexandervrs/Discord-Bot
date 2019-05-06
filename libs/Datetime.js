
(function() {
	
	Datetime = {
	
		GetToday: function(dateSeparator = "/", timeSeparator = ":") {

			var today = new Date();
			return (String(today.getMonth() + 1).padStart(2, "0") + dateSeparator + String(today.getDate()).padStart(2, "0") + dateSeparator + today.getFullYear() + " "
			+ today.getHours() + timeSeparator + today.getMinutes() + timeSeparator + today.getSeconds() );

		}

	};
	
	module.exports = Datetime;
	
})();

