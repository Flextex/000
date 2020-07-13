
    /** Configuración **/
	var acortadores = [
      'https://exe.io/st?api=7c61345120b9fe0236a9326753938bb885f91880&url=',	  
	];
	/*******************/

	function base64_decode (data) {
		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
			ac = 0,
			dec = "",
			tmp_arr = [];

		if (!data) {
			return data;
		}

		data += '';

		do { // unpack four hexets into three octets using index points in b64
			h1 = b64.indexOf(data.charAt(i++));
			h2 = b64.indexOf(data.charAt(i++));
			h3 = b64.indexOf(data.charAt(i++));
			h4 = b64.indexOf(data.charAt(i++));

			bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

			o1 = bits >> 16 & 0xff;
			o2 = bits >> 8 & 0xff;
			o3 = bits & 0xff;

			if (h3 == 64) {
				tmp_arr[ac++] = String.fromCharCode(o1);
			} else if (h4 == 64) {
				tmp_arr[ac++] = String.fromCharCode(o1, o2);
			} else {
				tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
			}
		} while (i < data.length);

		dec = tmp_arr.join('');

		return dec;
	}

	function showlink(){
		if (atob(document.location.href.match(/has\/\?(.+)\/?/)[1]).indexOf('{')!=0){
			var urldes = base64_decode(document.location.href.match(/has\/\?(.+)\/?/)[1]);
			var ruta = document.location.href.replace('?'+document.location.href.match(/has\/\?(.+)\/?/)[1],'');
			var lo = {
					"l":"",
					"c": 0
				};
			lo.l = urldes;
			document.location.href = ruta+'?'+btoa(JSON.stringify(lo));
		} else {
			var lo = JSON.parse(atob(document.location.href.match(/has\/\?(.+)\/?/)[1]));

			if (acortadores.length > lo.c) {
				var ruta = acortadores[lo.c]+document.location.href.replace('?'+document.location.href.match(/has\/\?(.+)\/?/)[1],'');
				lo.c = lo.c+1;
				document.location.href = ruta+'?'+btoa(JSON.stringify(lo));
			} else {
				document.location.href = lo.l;
			}
		}
	}