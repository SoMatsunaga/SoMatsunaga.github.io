// 接続確認用
console.log("quiz.jsは同期されています");

//初期設定
q_sel = 3; //選択肢の数
q_max = 0; //出題数
var timer = 0; //経過時間
q_num = 5; // 問題数
var t_flag = true; //時間のフラグ

//問題と解答の配列
qa = new Array();
var r_qa = new Array; 
var ansers = new Array;

var start = performance.now(); // Web表示開始時の時間

// 難易度の受けとり
var query = location.search;
var value = query.split('=');

count = 0; //問題番号
q_sel = 3; //選択肢の数

// ホームに戻るを隠す
$('#home').hide();

// 経過時間の表示
function time_func(){

	if(t_flag==true){
		var now = performance.now();
		
		var datet = parseInt((now - start)/1000);
		
		var min = parseInt((datet / 60) % 60);
		var sec = datet % 60;
		
		// 数値が1桁の場合、頭に0を付けて2桁で表示する指定
		if(min < 10) { min = "0" + min; }
		if(sec < 10) { sec = "0" + sec; }
		
		timer = min + ':' + sec;
		
		// テキストフィールドにデータを渡す処理（不要な行を削除する）
		const p_timer = document.querySelector('#time_count');
		p_timer.textContent = "経過時間[" + timer + "]";
		
		setTimeout("time_func()", 1000);
	}
}

// 最初の問題の表示
quiz_level(value[1]);
quiz();

// 問題表示
function quiz() {
	var s, n;

	//問題
	rnd = Math.floor(Math.random() * qa.length); //乱数
	for(i=0;i<=r_qa.length;i++){
		if(r_qa[i]==rnd){
			rnd = Math.floor(Math.random() * qa.length);
			console.log("被った");
			i=0;
		}
	}
	r_qa[count] = [rnd];
	console.log(r_qa.length);

	document.getElementById("text_q").innerHTML = (count + 1) + "問目：" + qa[rnd][0];
	//選択肢
	s = "";
	for (n=1;n<=q_sel;n++) {
		if (qa[rnd][n] != "") {
			s += "【<a href='javascript:anser(" + n + ")'>" + n + "：" + qa[rnd][n] + "</a>】";
		}
	}
	document.getElementById("text_s").innerHTML = s;
}

// 解答表示
function anser(num) {
	var s;
	var ans;
	s = (count + 1) + "問目：";
	//答え合わせ
	if (num == qa[rnd][q_sel + 1]) {
		//正解
		ansers[count] = ["○"];
	} else {
		ansers[count] = ["×"];
	}
	ans = qa[rnd][4];
    s += ansers[count] + "\n正解は、" + qa[rnd][ans];
    document.getElementById("text_a").innerHTML = s;


	//次の問題を表示
	count++;
	if (count < q_num) {
		quiz();
	} else {
		// 終わり
        end_quiz();
	}
}

// クイズ終了
function end_quiz() {
	var score=0;
	var par=0;

	// 経過時間の非表示
	$('#time_count').hide();
	// いらない文字を消す
	$('#section_1').hide();
	$('#section_2').hide();
	$('#section_3').hide();

	// 成績を表で表示
    s = "<table><caption>成績発表</caption>";
	//1行目
	s += "<tr><th>問題</th>";
	for (n=0;n<q_num;n++) {
		s += "<th>" + (n+1) + "</th>";
	}
	s += "<th>正答率</th><th>時間</th>";
	s += "</tr>";
	//2行目
	s += "<tr><th>成績</th>";
	for (n=0;n<q_num;n++) {
		s += "<td>" + ansers[n] + "</td>";
		if(ansers[n]=="○"){
			score += 1;
		}
	}
	par = (score/ansers.length)*100;
	s += "<td>" + par + "%" + "</td>";
	s += "<td>" + timer + "</td>";
	s += "</tr>";
	s += "</table>";
	document.getElementById("score").innerHTML = s;
    $('#question').hide();
	$('#choice').hide();
    $('#anser').hide();

	// ホームへ戻るボタンの表示
	$('#home').show();

	// 経過時間を止める
	t_flag = false;
}

// 難易度の設定
function quiz_level(level){
	if(level=="1"){
		console.log("初級");
		qa[0] = ["株式","かぶしき","とうしき","かぶか",1];
		qa[1] = ["著者","しゃしゃ","ちょしゃ","ちょさく",2];
		qa[2] = ["簡単","かいたん","かんかん","かんたん",3];
		qa[3] = ["吸う","すう","おぎなう","ふう",1];
		qa[4] = ["宣言","さいげん","せんげん","せんとう",2];
		qa[5] = ["秘密","こりつ","ひそか","ひみつ",3];
		qa[6] = ["頭痛","ずこう","ずつう","ふくつう",2];
		qa[7] = ["歌詞","かし","がっき","かよう",1];
		qa[8] = ["装置","そうちゃく","よそおい","そうち",3];
		qa[9] = ["忠告","けいかい","ちゅうこく","ちこく",2];
		qa[10] = ["発揮","はっき","はっかく","とっき",1];
		qa[11] = ["有限","きょくげん","ありあけ","ゆうげん",3];
		qa[12] = ["勤務","きんむ","つとめ","ちょくめい",1];
		qa[13] = ["故郷","こうきょう","こきょう","じもと",2];
		qa[14] = ["批判","ひひょう","こうばん","ひはん",3];
		qa[15] = ["奮起","ふんき","ふんがい","ほうき",1];
		qa[16] = ["想像","もうそう","そうぞう","しょうぞう",2];
		qa[17] = ["皇后","すめらぎ","こうてい","こうごう",3];
		qa[18] = ["観劇","かんげき","かんげい","がいけん",1];
		qa[19] = ["樹木","しんりん","じゅもく","じゅりん",2];
		qa[20] = ["参拝","さんはい","ばんざい","さんぱい",3];

		q_max=qa.length;
		console.log(q_max);

		$('#title').text("漢字クイズ　初級")
	}
	else if(level=="2"){
		console.log("中級");
		qa[0] = ["悠然","ゆうぜん","ぜんぜん","しねん",1];
		qa[1] = ["一喝","いっか","いっかつ","かいかつ",2];
		qa[2] = ["洪積","こうせつ","きょうせき","こうせき",3];
		qa[3] = ["詔勅","しょうちょく","こうちょく","しょうち",1];
		qa[4] = ["扶助","こうじょ","ふじょ","こうすけ",2];
		qa[5] = ["富裕","ふよう","とみ","ふゆう",3];
		qa[6] = ["煩雑","ほざつ","はんざつ","はんも",2];
		qa[7] = ["騰貴","とうき","ふけい","とうけい",1];
		qa[8] = ["潤色","たくしょく","うるういろ","じゅんしょく",3];
		qa[9] = ["長蛇","ながへび","ちょうだ","うみへび",2];
		qa[10] = ["叔父","おじ","おば","そふ",1];
		qa[11] = ["亜流","がりゅう","あり","ありゅう",3];
		qa[12] = ["総帥","そうすい","ししょう","そうちょう",1];
		qa[13] = ["偏屈","へりくつ","へんくつ","かたより",2];
		qa[14] = ["抹消","ましょう","まったん","まっしょう",3];
		qa[15] = ["禍根","かこん","かいこん","うずね",1];
		qa[16] = ["手綱","てづな","たずな","てなわ",2];
		qa[17] = ["閑職","かんしょう","へいしょく","かんしょく",3];
		qa[18] = ["感銘","かんめい","かんな","がんめい",1];
		qa[19] = ["空疎","かいそ","くうそ","くうせつ",2];
		qa[20] = ["克己心","こうきしん","こっこつしん","こっきしん",3];

		q_max=qa.length;
		console.log(q_max);

		$('#title').text("漢字クイズ　中級")
	}
	else if(level=="3"){
		console.log("上級");
		qa[0] = ["瑞雲","ずいうん","まだらぐも","そううん",1];
		qa[1] = ["賞牌","しょうひ","しょうはい","しょひん",2];
		qa[2] = ["一瞥","いっしゅう","いっぺい","いちべつ",3];
		qa[3] = ["艶姿","あですがた","ようし","つやすがた",1];
		qa[4] = ["輔弼","ほしゅう","ほひつ","ほゆ",2];
		qa[5] = ["杏林","あんばやし","あんりん","きょうりん",3];
		qa[6] = ["鍍金","ときん","めっき","こがね",2];
		qa[7] = ["歌詞","かし","がっき","かよう",1];
		qa[8] = ["鼎談","かいだん","わいだん","ていだん",3];
		qa[9] = ["堆積","ちくせき","たいせき","るいせき",2];
		qa[10] = ["匡正","きょうせい","こくせい","こうせい",1];
		qa[11] = ["牝牡","ゆうひ","おうめ","ひんぼ",3];
		qa[12] = ["俗諺","ぞくげん","ことわざ","ゆうせつ",1];
		qa[13] = ["戎馬","かいま","じゅうば","かいば",2];
		qa[14] = ["形骸","かがい","がいこつ","けいがい",3];
		qa[15] = ["洞察","どうさつ","どうし","とうさ",1];
		qa[16] = ["唖然","がぜん","あぜん","あんぜん",2];
		qa[17] = ["趨向","しゅこう","しこう","すうこう",3];
		qa[18] = ["灼熱","しゃくねつ","かねつ","ねんねつ",1];
		qa[19] = ["騒擾","そうゆう","そうじょう","そうき",2];
		qa[20] = ["尤物","いうもの","いぶつ","ゆうぶつ",3];

		q_max=qa.length;
		console.log(q_max);

		$('#title').text("漢字クイズ　上級")
	}
}

// qa[] = ["","","","",""];