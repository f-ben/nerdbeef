var version = "v2.34"
var datum = "22.01.2017";
var players = [];
var scores = [];
var buzzered_players = [];
var timestamps = [];
var placeholder;
var headerarray = [];
var triviadata = [];
var currentc;
var currentp;
var currentq;
var questiontype;
//var floating_buzzer_icons = ['bear.png','flower.png','homer.png','love.png','summer.png','sunny.png'];
var zonkaudio = new Audio('/sounds/zonk.mp3');
var color_red = ['#F44336', '#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350','#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C'];
var color_pink = ['#E91E63', '#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A', '#E91E63', '#D81B60', '#C2185B', '#AD1457', '#880E4F'];
var color_purple = ['#9C27B0', '#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C'];
var color_deep_purple = ['#673AB7', '#EDE7F6', '#D1C4E9', '#B39DDB', '#9575CD', '#7E57C2', '#673AB7', '#5E35B1', '#512DA8', '#4527A0', '#311B92'];
var color_indigo = ['#3F51B5', '#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB', '#303F9F', '#283593', '#1A237E'];
var color_blue = ['#2196F3', '#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1'];
var color_light_blue = ['#03A9F4', '#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B'];
var color_cyan = ['#00BCD4', '#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4', '#00ACC1', '#0097A7', '#00838F', '#006064'];
var color_teal = ['#009688', '#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#00897B', '#00796B', '#00695C', '#004D40'];
var color_green = ['#4CAF50', '#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#1B5E20'];
var color_light_green = ['#8BC34A', '#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#33691E'];
var color_lime = ['#CDDC39', '#F9FBE7', '#F0F4C3', '#E6EE9C', '#DCE775', '#D4E157', '#CDDC39', '#C0CA33', '#AFB42B', '#9E9D24', '#827717'];
var color_yellow = ['#FFEB3B', '#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FDD835', '#FBC02D', '#F9A825', '#F57F17'];
var color_amber = ['#FFC107', '#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28', '#FFC107', '#FFB300', '#FFA000', '#FF8F00', '#FF6F00'];
var color_orange = ['#FF9800', '#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100'];
var color_deep_orange = ['#FF5722', '#FBE9E7', '#FFCCBC', '#FFAB91', '#FF8A65', '#FF7043', '#FF5722', '#F4511E', '#E64A19', '#D84315', '#BF360C'];
var color_brown = ['#795548', '#EFEBE9', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63', '#795548', '#6D4C41', '#5D4037', '#4E342E', '#3E2723'];
var color_grey = ['#9E9E9E', '#FAFAFA', '#F5F5F5', '#EEEEEE', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#212121'];
var color_blue_grey = ['#607D8B', '#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE', '#78909C', '#607D8B', '#546E7A', '#455A64', '#37474F', '#263238'];
var colorarray = [color_red, color_pink, color_purple, color_deep_purple, color_indigo, color_blue, color_light_blue, color_cyan, color_teal, color_green, color_light_green, color_lime, color_yellow, color_amber, color_orange, color_deep_orange, color_brown, color_grey, color_blue_grey];
//var colorarray = [color_indigo, color_light_blue, color_teal, color_light_green, color_orange, color_brown, color_red, color_pink, color_purple, color_deep_purple, color_blue, color_cyan, color_green, color_lime, color_yellow, color_amber, color_deep_orange, color_grey, color_blue_grey];

var socket = io.connect(ip);

function refresh_drag_drop()
{
	$('.drop').droppable({
		accept: '.drag',
		activeClass: 'highlight',
		drop: function(event, ui) {
			id = $(this).attr("id");
			if(id=="plus")
			{
				temp = parseFloat($(this).closest('td').prev('td').find('#points').val());
				temp += parseFloat($(ui.draggable).text())
				$(this).closest('td').prev('td').find('#points').val(temp);
			}
			if(id=="minus")
			{
				temp = parseFloat($(this).closest('td').prev('td').find('#points').val());
				temp -= parseFloat($(ui.draggable).text())
				$(this).closest('td').prev('td').find('#points').val(temp);
			}
			draggableid = $(ui.draggable).parent(".pointsrow").attr("id");
			$( "#players" ).trigger("submit");
			socket.emit('disablequestion',draggableid);
		}
	});
			
	$('.drag').draggable({
		cursor: 'pointer',
		connectWith: '.drop',
		opacity: 0.5,
		zIndex: 1,
		revert: true,
	});
}

function start_question(data)
{
	currentq = data.currentq;
	if($('#floatingpietimer').is(':hidden'))
	{
		if(questiontype=='image')
		{
			console.log(currentq);
			$('#imagequestionimage').attr('src','/imagequestionimage/'+currentq)
			$('#imagequestionimage').width(60000);
			$('#imagequestionimage').height(50000);
			$('#imagequestionimage').transition({x:'-30000px',y:'-25000px',scale:'1',delay:'0',duration:'0'});
			$('#imagequestion').show();
			currentq = "Bilder raten..."
			$('#imagequestionimage').transition({x:'-29700px',y:'-24750px',scale:'0.01',delay:'1000',duration:'19000'});
		}
		
		$('#floatingpietimer').css('height',110)
		$('#floatingpietimer').show();
		$('#pietimertitlecontent').text(data.currentc+': '+data.currentp);
		$('#pietimerfrage').text(data.currentq);
		var floatingpietimerheight = $('#floatingpietimer').outerHeight(true);
		var pietimerfrageheight = $('#floatingpietimer #pietimerfrage').outerHeight(true);
		
		floatingpietimerheight = floatingpietimerheight+pietimerfrageheight+350;
		floatingpietimerheight = floatingpietimerheight+'px';

		$('#pietimermain').pietimer({
			seconds: 20,
			color: '#9FA8DA',
			is_reversed: true
			},
			function(){
				zonkaudio.play();
				$('#floatingpietimer').hide();
				$('#imagequestion').hide();
			});
		$('#floatingpietimer').css('height',floatingpietimerheight);
		$('#pietimermain').pietimer('start');
	}

}

function points_recalc(data)
{
	var op = data.op;
	var val = data.val;
	var newval;
	
	$('.pointsrow').each(function() {
		var aktuelle_punkte = $(this).text();
		if(op=='mult')
			newval = aktuelle_punkte*2;
		else if(op=='div')
			newval = aktuelle_punkte/2;
	
		var aktuelle_id = $(this).attr('id').substr(1,4);
		if(aktuelle_id==val)
		{
			$(this).find('*').not('.borderfake').remove();
			var div = document.createElement('div');
			$(div).addClass('drag').text(newval).draggable({ revert: true}).appendTo($(this));
		}
	});
}

function sync_players(data)
{
	reset_timestamps();
	clean_buzzer();
	clean_trivia();
	players.splice(0,players.length);
	for(i=0;i<data.player.length;i++)
		players.push(data.player[i]);
	
	scores.splice(0,scores.length);
	for(i=0;i<data.points.length;i++)
		scores.push(data.points[i]);
	
	$('#scoresdiv').find('div').remove();
	
	for(i=0;i<players.length;i++)
		$("#scoresdiv").append('<div id=playerwrapper><div id=playername>'+players[i]+'</div><div id=playerscores>'+scores[i]+'</div></div>');

	$('#floatingbuzzer').hide();
	$('#floatingtrivia').hide();
	$('#pietimermain').pietimer('pause');
	$('#floatingpietimer').css('top','290px');
	$('#floatingpietimer').hide();
	$('#imagequestion').hide();
	clean_admin_question();
};

function clean_admin_question()
{
	$("#startquestionbutton").empty();
	$("#current").empty();
	$("#frage").empty();
	$("#media").remove('iframe');
	$("#media").empty();
	$("#multiple").empty();
	$("#antwort").empty();	
	$("#triviabutton").empty();
	$("#adminyoutube").remove();
	currentc='';
	currentp='';
	questiontype='';
}

function sync_game(data)
{
	$("#spielfeldheader").find("td").remove();
	$("#spielfeld").find("tr:gt(0)").remove();
	$("#floatingwelcome").hide();
	var p=0;
	var i=0;
	var temp;
	var id;
	var pointsarray = data.points.split(',');
	headerarray.splice(0,headerarray.length);
	
	for(i=0;i<data.categories.length;i++)
		headerarray.push(data.categories[i]);
	
	var headerarrayLength = parseInt(headerarray.length);
	var pointsarrayLength = parseInt(pointsarray.length);
	for (i=0; i<headerarrayLength; i++)
	{
		if(i==0)
			var ersteletztespalteborder = 'style=\'border-left:1px solid white;\' ';
		else if (i==(headerarrayLength-1))
			var ersteletztespalteborder = 'style=\'border-right:2px solid white;\' ';
		else
			var ersteletztespalteborder = '';
		
		$("#spielfeldheader").append('<td id=header '+ersteletztespalteborder+'>'+headerarray[i]+'</td>');
	}

	$("#adminpoints").find('tr:gt(0)').remove();
	for (i=0; i<pointsarrayLength; i++)
	{
		$("#adminpoints").append('<tr><td><div id='+pointsarray[i]+' class=mult>* 2</div><div id='+pointsarray[i]+' class=div>/ 2</div></td></tr>');
		$("#spielfelddiv table").append('<tr id=points>')
		for (p=0; p<headerarrayLength; p++)
		{
			if(i==0)
			{
				var erstezeilediv='<div class=borderfake style=\'top:0px;background-color:'+colorarray[p][7]+';\'></div>';
				var erstezeileborder='border-top:0px;';
			}
			else if(i==(pointsarrayLength-1))
			{
				var erstezeilediv='<div class=borderfake style=\'bottom:0px;background-color:'+colorarray[p][3]+';\'></div>';
				var erstezeileborder='border-bottom:0px;';				
			}
			else
			{
				var erstezeilediv='';
				var erstezeileborder='';
			}
			$("#spielfelddiv table #points").last().append('<td class=pointsrow style=\'position:relative;'+erstezeileborder+'background-color:'+colorarray[p][i+3]+'\' id='+p+pointsarray[i]+'>'+erstezeilediv+'<div class=drag>'+pointsarray[i]+'</div></td>');
		}
		$("#spielfelddiv table").append('</tr>');
	}
}

function check_id_in_array(data)
{
	return data = temp;
}

function random_floating_buzzer_icon()
{
	var icon = Math.floor((Math.random() * floating_buzzer_icons.length));
	return floating_buzzer_icons[icon];
}

function buzzer_accepted(data)
{
	if($('#floatingpietimer').is(':visible'))
	{
		var audio = new Audio('/sounds/buzzer.mp3');
		var check_id = buzzered_players.indexOf(data.buzzerid);
		var zeit = new Date;
		var millisekunden = zeit.getTime();
		
		$('#imagequestion').hide();
		$('#floatingpietimer').css('top','1200px');
		$('#buzzer').css("font-size", "175px");
		$('#buzzertitlecontent').text(currentc+' '+currentp);
		
		if(check_id == -1)
		{
			if ($('#floatingbuzzer').is(':hidden'))
			{
				audio.play();
				$('#buzzer').text(players[data.buzzerid]);
				$('#pietimermain').pietimer('pause');
				$('#floatingbuzzer').show();
				placeholder=data.buzzerid;
				timestamps.push(millisekunden);
			}
			if ($('#floatingbuzzer').is(':visible')&&(placeholder!=data.buzzerid))
			{
				othertimestamp = millisekunden;
				othertimestamp -= timestamps[0];
				$('#timestamp').append('<div id=timestampentry>'+players[data.buzzerid]+'<br />'+othertimestamp+' ms</div>')
				buzzered_players.push(data.buzzerid);				
			}
		}
	}
}

function clean_buzzer()
{
	$('#buzzer').empty();
	$('#buzzer').text('');
	$('#timestamp').empty();
}

function clean_trivia()
{
	$('#triviatitlecontent').text('');
	$('#trivia').empty();
}

function show_trivia(data)
{
	$('#pietimermain').pietimer('pause');
	clean_trivia();
	$('#triviatitlecontent').text(currentc+' '+currentp);

	if(data[0]=="text")
	{
		$('#trivia').html(data[1]);
		$('#trivia').css("font-size", "24px");
	}
	else if(data[0]=="image")
	{
		var img = $('<img />', { 
			id: 'triviaimage',
			src: 'trivia/'+data[1],
		});
		img.appendTo($('#trivia'));
		$(img).css("max-height", "550px");
		$(img).css("max-width", "1130px");
	}
	else if(data[0]=="imagequestionimage")
	{
		var img = $('<img />', { 
			id: 'triviaimage',
			src: 'imagequestionimage/'+data[1],
		});
		img.appendTo($('#trivia'));
		$(img).css("max-height", "550px");
		$(img).css("max-width", "1130px");
	}
	else if(data[0]=="audio")
	{
		var audio = new Audio('/sounds/'+data[1]);
		audio.play();
	}
	else if(data[0]=="video")
	{
		var youtubevideo = data[1];
		var youtubeid = youtubevideo.split('#');
		var videoid = youtubeid[0];
		var videoanfang = youtubeid[1];
		var videoende = youtubeid[2];
		
		if(videoanfang != '')
			videoanfang = '&start='+videoanfang;
		
		if(videoende != '')
			videoende = '&end='+videoende;
		
		var video = $('<iframe />', { 
			height: '550',
			width: '1130',
			src: 'https://www.youtube.com/embed/'+youtubeid[0]+'?autoplay=1'+videoanfang+videoende,
			frameborder: '0',
			iv_load_policy: '3',
		});
		video.appendTo($('#trivia'));
	}
	$('#floatingbuzzer').hide();
	$('#imagequestion').hide();
	$('#floatingtrivia').show();
}

function disable_question(data)
{
	tempid = '#'+data;
	$(tempid).fadeTo('slow',0.15);
}

function fix_question(data)
{
	tempid = '#'+data;
	$(tempid).fadeTo('slow',1);
}

function reset_timestamps()
{
	check_id = 9999;
	placeholder = 9999;
	buzzered_players.splice(0,buzzered_players.length);
	timestamps.splice(0,timestamps.length);
	$("#timestamp").find("div").remove();
}

function read_question(id)
{
	clean_admin_question();
	var location = 'http://'+ip+'/fragen.txt';
	$.get( location, function( data ) {
		var i=0;
		var zeilen = data.split('\n');					
		for(i=0;i<=zeilen.length;i++)
		{
			var fragen = zeilen[i].split('|');
			if (fragen[0]==id)
			{
				if((currentc==headerarray[fragen[0][0]])&&(currentp==$('#'+id.substr(0,id.length)).text()))
				{
					console.log("Gleiche Kategorie und Frage, nicht neu geladen");
				}
				else
				{
					currentc = headerarray[fragen[0][0]];
					currentp = id.substr(0,id.length);
					currentp = $('#'+currentp).text();
					currentq = fragen[2];
					questiontype = fragen[1];
					
					$('#current').text(currentc+': '+currentp+' ('+questiontype+')');
					$('#frage').text(currentq);
					
					$("#startquestionbutton").text('Frage starten');
					if (questiontype == 'simple')
					{
						$('#antwort').text('Antwort: '+fragen[3]);
					}
					else if (questiontype == 'multiple')
					{
						$('#multiple').text('A) '+fragen[3]);
						$('#multiple').append('<br>B) '+fragen[4]);
						$('#multiple').append('<br>C) '+fragen[5]);
						$('#multiple').append('<br>D) '+fragen[6]);
						$('#antwort').text('Antwort: '+fragen[7]);
					}
					else if (questiontype == 'audio')
					{
						var youtubevideo = fragen[3];
						var youtubeid = youtubevideo.split('#');
						var videoid = youtubeid[0];
						var videoanfang = youtubeid[1];
						var videoende = youtubeid[2];
						
						if(videoanfang != '')
							videoanfang = '&start='+videoanfang;
						
						if(videoende != '')
							videoende = '&end='+videoende;					

						$('#antwort').text('Antwort: '+fragen[4]);
						var adminaudio = $('<iframe />', { 
							width: '560',
							height: '315',
							src: 'https://www.youtube.com/embed/'+youtubeid[0]+'?autoplay=0'+videoanfang+videoende,
							frameborder: '0',
							id: 'adminyoutube',
							iv_load_policy: '3',
						});
						adminaudio.appendTo($('#media'));
					}
					else if (questiontype == 'image')
					{
						$('#frage').text('');
						var adminimage = $('<img />', { 
							width: '560',
							height: '315',
							src: 'imagequestionimage/'+currentq,
							id: 'adminimage',
							iv_load_policy: '3',
						});
						adminimage.appendTo($('#media'));
						$('#antwort').text('Antwort: '+fragen[3]);
					}

					var triviatype = fragen[fragen.length-2];
					var trivia = fragen[fragen.length-1];
					if(questiontype == 'image')
						trivia = currentq;

					if ((triviatype=='image')||(triviatype=='video')||(triviatype=='text')||(triviatype=='audio')||(triviatype=='imagequestionimage'))
					{
						$('#triviabutton').text('Show trivia');
						triviadata.splice(0,triviadata.length);
						triviadata.push(triviatype);
						triviadata.push(trivia);
					}
				}
			}
		}
	});
};