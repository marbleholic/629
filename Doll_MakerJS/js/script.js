window.addEventListener('load',function(){
    let mess_box = document.getElementById('textbox');
    let mess_text = document.getElementById('text');
    /* mswin_flg:trueの時文字送りの処理が実行される */ 
    let mswin_flg = true;
    /* stop_flg:trueになると文字送りを止める */ 
    let stop_flg = false;
    /* end_flg:trueになると文字送り関連の処理を全て止める
    （シナリオの最後に動作させる） */
    let end_flg = false;
    /* text[n]nの部分のカウント。シーンの切り替え */ 
    let scene_cnt = 0;
    /* text[n]の中の「"",」の部分のカウント。
    一つの塊の上から0、1、2…と続く */
    let line_cnt = 0;
    /* 文字の表示スピードを調整する。単位はミリ秒 */
    const interval = 30;
    /* caseの中で使用する変数の宣言を行う。
    選択肢の個数分だけ用意する */
    let select_num1 = 0;
    let select_num2 = 0;
    let select_num3 = 0;
    let select1 = document.getElementById('select1');
    let select2 = document.getElementById('select2');
    let select3 = document.getElementById('select3');
    let select_text1 = document.getElementById('selectText1');
    let select_text2 = document.getElementById('selectText2');
    let select_text3 = document.getElementById('selectText3');
    let text = [];

    text[0] = [
        "",
        "1F 玄関ホール",
        "<bg 1>体の芯まで凍えるような寒気と鈍い頭痛で目を覚ますと見知らぬ廃屋の中にいた。",
        "夜中まで酒場で飲んでいたのは覚えているが、酒場を出てからの記憶が全く<break>なかった。",
        "それにしても寒い。まだ初秋だというのに、震えが止まらない。目が覚めるのが<break>もう少し遅ければ凍死していたかもしれない。",
        "とにかくここから出なければならない。<break>寒さと頭痛によろけながら玄関ドアに向かった。<fadeOut_bg><bg 1>",
        "<fadeIn_bg><bg 2>急いでドアノブに手を伸ばすが、ドアは南京錠とダイヤル錠で二重にロックされていた。鍵を繋ぐ鎖は太く頑丈で、道具がなければ切断できないだろう。<fadeOut_bg><bg 2>",
        "寒さと頭痛に耐えながら、他の出口を探す。<break>1階の窓には鉄格子がはめられている。<fadeIn_bg><bg 3>1階からの脱出は諦め、軋む階段を錆びた<break>手すりを握りながら2階へ向かう。",
        "廊下の窓から月明かりを頼りに外を見渡す…<fadeOut_bg><bg 3>",
        "<fadeIn_bg><bg 17>この世のものとは到底思えない光景が目に飛び込んできた。",
        /* 背景の表示。
        <bg n>（n＝表示させたい背景ファイルにつけた番号） */
        /* 背景のフェードイン<fadeIn_bg> */
        "屋敷はまるで絶海の孤島のごとく闇の中に浮かんでいる。<break>唯一門扉から玄関へ続く色褪せて汚れたタイルの道だけが、陸地とを繋ぐ橋のようにのびている。",
        "玄関以外に出口はない。<fadeOut_bg><bg 17>",
        "<fadeIn bg><bg 12>重くなった足を引きずり、玄関へ戻る。<break>今いるのは自分のいた世界ではない。妄想としか思えない考えが浮かんだ。",
        "突然、身を切るような寒風と共に少女のような声が聞こえてくる。",
        "「天国は空にある。地獄は地下にある。」<break>「夜明けに門は開き、扉は閉じる。鍵は下に、数字は上に。」<break>しかし、屋敷の中に人影は見当たらない。<fadeOut_bg><bg 12>",
        "<fadeIn_bg><bg 2>玄関に戻り扉を確かめる。<break>どうやら南京錠の鍵とダイヤル錠の番号をさがすしかないらしい。そう考えた自分はまともではないかもしれない。",
        /* 選択肢を表示。<text[n]のｎの数字と合わせる。
        <select1 1>を選択すると、text[1]のシナリオを次に読み込む。 分岐の時に非表示にしておきたい選択肢のボックスは
        <select〇 none>としておく。*/
        "<select1 1><select2 2><select3 none><text1 1F><text2 2F><selectBox>どちらから調べるか<fadeOut_bg><bg 2>"
    ];

    text[1] = [
        "<fadeIn_bg><bg 4>1F 廊下",
        "長い時間放置されていた屋敷は荒れている。床には埃が積もり、壁紙が剝がれ建材が剝き出しになっているところも多い。",
        "キッチンとダイニングを調べたが、朽ちたテーブルと椅子だったであろう木片が床に<break>散らばっているだけだった。次はリビングだ。<fadeOut_bg><bg 4><skip 3>"
        /* テキストボックスに一度に表示される文章の中で改行する場合
        改行する部分に<break>を入れる */
        /* アイテム表示<item n> */
        /* アイテムのフェードイン<fadeIn_item> */
    ];
    text[2] = [
        "<fadeIn_bg><bg 3>階段",
        "寒さと頭痛に顔をしかめながら、再び軋む階段を上り2階へ向かう。<fadeOut_bg><bg 3>",
        "<fadeIn_bg><bg 12>2階には部屋が3つあるようだが、つきあたりの右側は鍵がかかっている。<break>ここは後回しにした方がよいだろう。",
        "ひとまず扉が半開きになっている向かいの部屋を調べることにする。<fadeOut_bg><bg 12><skip 8>"
    ];

    text[3] = [
        "<fadeIn_bg><bg 5>1F リビング",
        "大広間の真ん中にソファが１脚置かれている。それ以外の家具は見当たらない。",
        "念のためソファの裏側を調べることにする。<fadeOut_bg><bg 5>",
        "<fadeIn_bg><bg 7>寸刻息が詰まりそうになる。<break>気味の悪い人形がソファの裏側にもたれかかるようにして置かれていた。<break>等身大で精巧に作られている。",
        "他には何も無い。ここにはもう用はない。<break>人形に目を向けないようにして部屋を出た。",
        "残るは浴室だ。<fadeOut_bg><bg 7><skip 4>"
    ];
    text[4] = [
        "<fadeIn_bg><bg 8>1F 浴室",
        "洗面台だけが残されている。<break>浴槽が置かれていたと思われる場所には焦げ茶色の染みが広がっており、<break>その中心に排水口が蟻地獄のごとく口を広げている。",
        "<fadeIn_item><item 1>再び洗面台に目を移すと、蛇口に鍵がかけられていることに気づく。<break>頭痛は治まったが、寒さと疲労で注意力が落ちているようだ。",
        "「鍵は下に、数字は上に。」ダイヤル錠の番号は2階にあるということだろう。<fadeOut_item><item 1><fadeOut_bg><bg 8><skip 5>"
    ];
    text[5] = [
        /* キャラクター表示<chara n n> */
        /* charaでswitch文の処理に入る。
            真ん中の数字でどの位置に表示させるか（HTMLのidの番号と一致させる）最後の数字で画像ファイルを呼び出す。 */
        /* キャラクターのフェードイン<fadeIn_chara 〇 〇>
        〇の部分にはフェードさせたいIDの末尾の数字を書く。 */
        "<fadeIn_bg><bg 3>階段",
        "再び軋む階段を上る。空が白み始めている。<break>「夜明けに門は開き、扉は閉じる。」<break>またあの声が聞こえてくる。急がなければ夜が明けてしまう。<fadeOut_bg><bg 3><skip 6>"
    ];

    text[6] = [
        "<fadeIn_bg><bg 12>2階には部屋が3つあるようだが、つきあたりの右側は鍵がかかっている。<break>ここは後回しにした方がよいだろう。",
        "ひとまず扉が半開きになっている向かいの部屋を調べることにする。<fadeOut_bg><bg 12>",
        "<fadeIn_bg><bg 9>2F 寝室",
        "寝室だったと思われる部屋には窓際にベビーベッドが置かれているだけのように<break>見えたが…",
        "部屋の隅に人影のようなものが見える。<break>しかし、暗闇の中ではっきりとはわからない。",
        "警戒しながらゆっくりと近づく。<fadeOut_bg><bg 9>",
        "<fadeIn_bg><bg 7>あの気味の悪い人形が置かれている。…1階にあったはずなのに。<break>自分以外にこの屋敷に誰かいるのだろうか。<break>しかし、今は余計なことを考えている暇はない。急いで次の部屋へ向かう。<fadeOut_bg7><skip 7>"
    ];

    text[7] = [
        "<fadeIn_bg><bg 10>2F 書斎",
        "小さな木製の机と本棚が並んでいる。<break>本棚には年代物の書物が並び、埃が積もっている。床に積もっていた埃が舞い、<break>窓から差し込む僅かな光に照らされ白く燐光を放っている。<fadeOut_bg><bg 10>",
        "<fadeIn_bg><bg 13>書き物机の上に真新しい封筒が置かれている。<break>本来宛先が書かれる部分に癖のある文字で『0666』と4桁の数字が並んでいる。<break>恐らくダイヤル錠の番号だろう。<fadeOut_bg><bg 13>",
        "<fadeIn_bg><bg 3>階段を滑るように降り、玄関へ急ぐ。傷んだ床材が悲鳴を上げた。<fadeOut_bg><bg 3><skip 13>"
    ];

    text[8] = [
        "<fadeIn_bg><bg 9>2F 寝室",
        "寝室だったと思われる部屋には窓際にベビーベッドが置かれているだけのように<break>見えたが…",
        "部屋の隅に人影のようなものが見える。<break>しかし、暗闇の中ではっきりとはわからない。",
        "警戒しながらゆっくりと近づく。<fadeOut_bg><bg 9>",
        "<fadeIn_bg><bg 7>等身大で精巧につくられた、気味の悪い人形が置かれている。<break>他には何も無い。ここにはもう用はない。<break>人形に目を向けないようにして部屋を出た。<fadeOut_bg7><skip 9>"
    ];

    text[9] = [
        "<fadeIn_bg><bg 10>",
        "2F 書斎",
        "小さな木製の机と本棚が並んでいる。<break>本棚には年代物の書物が並び、埃が積もっている。床に積もっていた埃が舞い、<break>窓から差し込む僅かな光に照らされ白く燐光を放っている。<fadeOut_bg><bg 10>",
        "<fadeIn_bg><bg 13>書き物机の上に真新しい封筒が置かれている。<break>本来宛先が書かれる部分に癖のある文字で『0666』と4桁の数字が並んでいる。<break>恐らくダイヤル錠の番号だろう。",
        "「鍵は下に、数字は上に。」残る南京錠の鍵は1階にあるということか。<fadeOut_bg><bg 13><skip 10>"
    ];

    text[10] = [
        "<fadeIn_bg><bg 4>1F 廊下",
        "長い時間放置されていた屋敷は荒れている。床には埃が積もり、壁紙が剝がれ建材が剝き出しになっているところも多い。",
        "キッチンとダイニングを調べたが、朽ちたテーブルと椅子だったであろう木片が床に<break>散らばっているだけだった。次はリビングだ。<fadeOut_bg><bg 4><skip 11>"
    ];

    text[11] = [
        "<fadeIn_bg><bg 5>1F リビング",
        "大広間の真ん中にソファが１脚置かれている。それ以外の家具は見当たらない。",
        "念のためソファの裏側を調べることにする。<fadeOut_bg><bg 5>",
        "<fadeIn_bg><bg 7>寸刻息が詰まりそうになる。<break>あの気味の悪い人形がソファの裏側にもたれかかるようにして置かれていた。<break>…2階にあったはずなのに。",
        "自分以外にこの屋敷に誰かいるのだろうか。<break>しかし、今は余計なことを考えている暇はない。急いで次の部屋へ向かう。<fadeOut_bg7><skip 12>"
    ];

    text[12] = [
        "<fadeIn_bg><bg 8>1F 浴室",
        "洗面台だけが残されている。<break>浴槽が置かれていたと思われる場所には焦げ茶色の染みが広がっており、<break>その中心に排水口が蟻地獄のごとく口を広げている。",
        "<fadeIn_item><item 1>再び洗面台に目を移すと、蛇口に鍵がかけられていることに気づく。<break>頭痛は治まったが、寒さと疲労で注意力が落ちているようだ。",
        "これで、鍵と錠の番号が手に入った。間もなく夜が明ける。<break>朽ちた床材を踏み鳴らしながら玄関へ急ぐ。<fadeOut_item><item 1><fadeOut_bg><bg 8><skip 14>"
    ];

    text[13] = [
        "<fadeIn_bg><bg 1>1F 玄関ホール",
        "南京錠を外し、ダイヤルを合わせる。",
        "「外れた。」思わず声に出してしまった。鎖を引き抜き、取っ手をまわす。",
        "開かない。押しても引いても、びくともしない。<break>思い切り体当たりをしても、結果は同じだった。",
        "怒りに耐えられず、大声を上げそうになった時…",
        "再び少女の声が、聞こえてきた。",
        "「天国は空にある。地獄は地下にある。」<break>「夜明けに門は開き、扉は閉じる。」",
        "「9に5を足すと答えは2。10に6を足すと答えはいくつ？」",
        "「9に5を足すと答えは2。10に6を足すと答えはいくつ？」<break>少女の声は繰り返す。依然として扉は開かない。",
        "「答えないとドアは開かない。」少女の声が付け加えた。<break>もう夜が明けてしまう。必死に頭を働かせる。",
        "<select1 15><select2 16><select3 none><text1 4><text2 6><selectBox>「9に5を足すと答えは2。10に6を足すと答えはいくつ？」<fadeOut_bg><bg 1>"
    ];

    text[14] = [
        "<fadeIn_bg><bg 1>1F 玄関ホール",
        "南京錠を外し、ダイヤルを合わせる。",
        "「外れた。」思わず声に出してしまった。鎖を引き抜き、取っ手をまわす。",
        "開かない。押しても引いても、びくともしない。<break>思い切り体当たりをしても、結果は同じだった。",
        "怒りに耐えられず、大声を上げそうになった時…",
        "再び少女の声が、聞こえてきた。",
        "「天国は空にある。地獄は地下にある。」<break>「夜明けに門は開き、扉は閉じる。」",
        "「女の子には同じ数の姉妹と兄弟がいます。そして兄弟には姉妹の半分の数の兄弟が<break>います。女の子は全員で何人？」",
        "「女の子には同じ数の姉妹と兄弟がいます。そして兄弟には姉妹の半分の数の兄弟が<break>います。女の子は全員で何人？」<break>少女の声は繰り返す。依然として扉は開かない。",
        "「答えないとドアは開かない。」少女の声が付け加えた。<break>もう夜が明けてしまう。必死に頭を働かせる。",
        "<select1 15><select2 16><select3 none><text1 4人><text2 6人><selectBox>女の子には同じ数の姉妹と兄弟がいます。そして兄弟には姉妹の半分の数の兄弟がいます。女の子は全員で何人？」<fadeOut_bg><bg 1>"
    ];

    text[15] = [
        "<fadeIn_bg><bg 12>扉が開いた。<break>暗闇の海に小島のように浮かんでいたはずの屋敷は、今はただの廃屋にしか<break>見えない。<fadeOut_bg><bg 12>",
        "<fadeIn_bg><bg 14>森の中の館。酒場で聞いた人形師の屋敷を思い出した。<break>言いようのない恐怖が、全身の毛を逆立たせ、震えが止まらなくなる。",
        "気持ちを奮い立たせ、朝日に照らされた門に向かって走る。<break>勢いよく門を開け、山道を麓の町まで駆け下りた。",
        "<fadeOut bg><bg 14>THE END",
        "<stop>The End"
    ];

    text[16] = [
        "<fadeIn_bg><bg 12>突然視界を奪われたように、暗闇に包まれた。<break>同時に足元が崩れ、奈落へと吸い込まれる。",
        "最期に年老いた男の声が聞こえた気がした。<fadeOut_bg><bg 12>",
        "<fadeIn_bg><bg 16>「君は良い部品になりそうだ。」",
        "<fadeOut_bg><bg 16>",
        "<fadeIn_bg><bg 15>GAME OVER",
        "<stop>Game Over"
    ];

    function main(){
        /* .shift()は配列の最初の要素を取り、その値を返す */
        let tmp = split_chars.shift();
        if(tmp == '<'){
                /* 変数tagget_strを宣言（初期値は空白） */
                let tagget_str = '';
                tmp = split_chars.shift();
                while(tmp != '>'){
                    /* tagget_strにtmpを追加する */
                    tagget_str += tmp;
                    tmp = split_chars.shift();
                }
                /* tagget_strの値を「　」で分ける（配列にする） */
                tagget_str = tagget_str.split(/\s/);
                switch(tagget_str[0]){
                    case 'stop':
                        stop_flg = true;
                        break;
                    /* 選択肢（class="selectBox")の表示 */
                    case 'selectBox':
                        $('.selectBox').addClass('show');
                        break;
                    /* 選択肢の文章の表示 */
                    case 'text1':
                        select_text1.innerHTML = tagget_str[1];
                        break;
                    case 'text2':
                        select_text2.innerHTML = tagget_str[1];
                        break;
                    case 'text3':
                        select_text3.innerHTML = tagget_str[1];
                        break;
                    /* 選択肢をクリックしたときまた、
                        非表示にしたいときの処理 */
                    /* tagget_str[1]がnoneの時、
                       該当の選択肢のボックスを非表示 */
                    case 'select1':
                        /* tagget_str[1]がnoneの時、該当の選択肢のボックスを非表示 */
                        if(tagget_str[1] === "none"){
                            $('#select1').addClass('none');
                        /* none以外の場合、select_numにtagget_str[1]の値を代入 */
                        }else{
                            select_num1 = tagget_str[1];
                            select1.addEventListener('click',function(){
                                /* scene_cntにselect_numの値を代入する（シーンの切り替え） */
                                scene_cnt = select_num1;
                                line_cnt  = -1;
                                /* 選択肢のボックスの非表示 */
                                $('.selectBox').removeClass('show');
                                /* selectNoneRemove()、textClick()の実行 */
                                selectNoneRemove();
                                textClick();
                            });
                        }
                        break;
                    case 'select2':
                        if(tagget_str[1] === "none"){
                            $('#select2').addClass('none');
                        }else{
                            select_num2 = tagget_str[1];
                            select2.addEventListener('click',function(){
                                scene_cnt = select_num2;
                                line_cnt  = -1;
                                $('.selectBox').removeClass('show');
                                selectNoneRemove();
                                textClick();
                            });
                        }
                        break;
                    case 'select3':
                        if(tagget_str[1] === "none"){
                            $('#select3').addClass('none');
                        }else{
                            select_num3 = tagget_str[1];
                            select3.addEventListener('click',function(){
                                scene_cnt = select_num3;
                                line_cnt  = -1;
                                $('.selectBox').removeClass('show');
                                selectNoneRemove();
                                textClick();
                            });
                        }
                        break;
                    /* 文章の中にbrタグ（改行用のタグ）を挿入する */
                    case 'break':
                        mess_text.innerHTML += '<br>';
                        break;
                    /* 分岐の後、共通の文章に合流する場合、選択肢の表示はないが、text[n]のnの番号を進めたいとき */
                    /* <skip n>として、nの部分に次に表示させたいtext[n]の番号を書く。 */
                    case 'skip':
                        scene_cnt = tagget_str[1];
                        /* line_cntの部分が-1になっているのは、次のクリックでline_cntの値を0にしたい（text[n]の初めの文章から表示） */
                        line_cnt = -1;
                        break;
                    /* 背景の表示 */
                    case 'bg':
                        /* id="bgimg"のsrcを書き換える */
                        document.getElementById('bgimg').src = 'img/bg'+tagget_str[1]+'.jpg';
                        break;
                    /* キャラクター表示 */
                    case 'chara':
                        document.getElementById('chara'+tagget_str[1]).src = 'img/chara' + tagget_str[2] +'.png';
                        break;
                    /* アイテム */
                    case 'item':
                        document.getElementById('item').src = 'img/item'+tagget_str[1]+'.png';
                        break;
                    /* キャラクターのみをフェードインさせる */
                    case 'fadeIn_chara':
                        function fadeIn_chara_remove(){
                            $('#charaposition' + tagget_str[1]).removeClass('fadein');
                        }
                        $('#charaposition' + tagget_str[1]).addClass('fadein');
                        document.getElementById('chara'+tagget_str[1]).src = 'img/chara' + tagget_str[2] +'.png';
                        /* 再利用できるようにアニメーションが終了次第「fadein」を除去する */
                        setTimeout(fadeIn_chara_remove,500);
                        break;
                    /* 背景のフェードイン */
                    case 'fadeIn_bg':
                        function fadeIn_bg_remove(){
                            $('#bgimg').removeClass('fadein');
                        }
                        $('#bgimg').addClass('fadein');
                        setTimeout(fadeIn_bg_remove,500);
                        break;
                    /* アイテムのフェードイン */
                    case 'fadeIn_item':
                        function fadeIn_item_remove(){
                            $('.itembox').removeClass('fadein');
                        }
                        $('.itembox').addClass('fadein');
                        setTimeout(fadeIn_item_remove,500);
                        break;
                    /* キャラクターのフェードアウト */
                    case 'fadeOut_chara':
                        function fadeOut_chara_remove(){
                            $('#charaposition' + tagget_str[1]).removeClass('fadeout');
                            document.getElementById('chara'+tagget_str[1]).src = 'img/chara' + tagget_str[2] +'.png';
                        }
                        $('#charaposition' + tagget_str[1]).addClass('fadeout');
                        setTimeout(fadeOut_chara_remove,500);
                        break;
                    /* 背景のフェードアウト */
                    case 'fadeOut_bg':
                        function fadeOut_bg_remove(){
                            $('#bgimg').removeClass('fadeout');
                            document.getElementById('bgimg').src = 'img/bg'+tagget_str[1]+'.jpg';
                        }
                        $('#bgimg').addClass('fadeout');
                        setTimeout(fadeOut_bg_remove,500);
                        break;
                    /* アイテムのフェードアウト */
                    case 'fadeOut_item':
                        function fadeOut_item_remove(){
                            $('.itembox').removeClass('fadeout');
                            document.getElementById('item').src = 'img/item0.png';
                        }
                        $('.itembox').addClass('fadeout');
                        setTimeout(fadeOut_item_remove,500);
                        break;
                    /* 背景のフェードアウトイン */
                    case 'fadeOutIn_bg':
                        function fadeOutIn_bg_change(){
                            document.getElementById('bgimg').src = 'img/bg'+tagget_str[1]+'.jpg';
                        }
                        function fadeOutIn_bg_remove(){
                            $('#bgimg').removeClass('fadeoutin');
                            $('#textbox').removeClass('none');
                            $('#textbox').trigger('click');
                        }
                        $('#bgimg').addClass('fadeoutin');
                        $('#textbox').addClass('none');
                        setTimeout(fadeOutIn_bg_change,1500);
                        setTimeout(fadeOutIn_bg_remove,3000);
                        break;
                }
            }
        if(!stop_flg){
            if(tmp){
                /* stop_flgがfalseかつ、tmpが「>」ではないとき、テキストボックス（mess_text）にtmpを追加する。
                また、main()の動作を均等な間隔で実行する */
                if(tmp != '>') mess_text.innerHTML += tmp;
                setTimeout(main,interval);
            }
        }else{
            /* それ以外の場合は空白 */
            mess_text.innerHTML += '<span class="blink-text"></span>';
        }
    }
    mess_box.addEventListener('click',function(){
        if(end_flg)return;
        if(mswin_flg){
            if(!stop_flg){
                /* stop_flgがfalseの時、line_cntの値が+1される */
                line_cnt++;
                /* stop_flgがfalseかつ、line_cntの値が一つのシーンの行数以上（text[scene_cnt].length）になったらselect_cntの値をscene_cntに代入する。またline_cntを初期値に戻す */
                if(line_cnt >= text[scene_cnt].length){
                    line_cnt = 0;
                }
            /* 上記以外の場合でscene_cntがtext[n]のnの最大値以上だったらend_flgをtrueにする */
            }else if(scene_cnt>=text.length){
                end_flg = true;
                return;
            }
            split_chars=text[scene_cnt][line_cnt].split('');
            mess_text.innerHTML='';
            main();
        }
    });
    /* テキストボックスをクリックしたときと同じ動きをさせる処理 */
    function textClick(){
        $('#textbox').trigger('click');
    }
    /* classの取り外しの処理 */
    function selectNoneRemove(){
        $('#select1').removeClass('none');
        $('#select2').removeClass('none');
        $('#select3').removeClass('none');
    }
});