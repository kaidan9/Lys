/* LYS — fiche départementale enrichie (données locales, sans requête distante) */
(() => {
  'use strict';
  const POP = {
    '01':679344,'02':523342,'03':333298,'04':168054,'05':143467,'06':1128418,'07':334231,'08':265893,'09':155722,'10':310447,
    '11':379648,'12':279609,'13':2087658,'14':709441,'15':144196,'16':352683,'17':672279,'18':298660,'19':240826,
    '2A':168306,'2B':187180,'21':540100,'22':611859,'23':115527,'24':417614,'25':547163,'26':524207,'27':602714,'28':433129,'29':933455,
    '30':770940,'31':1471468,'32':192645,'33':1690493,'34':1230289,'35':1120666,'36':216069,'37':619362,'38':1298990,'39':257973,
    '40':433570,'41':328543,'42':774133,'43':228654,'44':1487570,'45':691268,'46':176473,'47':333602,'48':76486,'49':833776,
    '50':497522,'51':563076,'52':168331,'53':305468,'54':732236,'55':180290,'56':783390,'57':1051309,'58':201417,'59':2615635,
    '60':829899,'61':275201,'62':1457905,'63':664453,'64':706564,'65':231349,'66':496855,'67':1163810,'68':770738,'69':1914667,
    '70':233185,'71':550310,'72':566733,'73':448226,'74':861158,'75':2103778,'76':1260964,'77':1468108,'78':1485086,'79':375229,
    '80':565413,'81':397352,'82':265817,'83':1119307,'84':572056,'85':713609,'86':438897,'87':373167,'88':357248,'89':332267,
    '90':140255,'91':1338485,'92':1654712,'93':1704316,'94':1426929,'95':1281653,
    '971':384160,'972':360630,'973':293996,'974':889679,'976':323153
  };
  const PREFECTURES = {
    '01':'Bourg-en-Bresse','02':'Laon','03':'Moulins','04':'Digne-les-Bains','05':'Gap','06':'Nice','07':'Privas','08':'Charleville-Mézières','09':'Foix','10':'Troyes',
    '11':'Carcassonne','12':'Rodez','13':'Marseille','14':'Caen','15':'Aurillac','16':'Angoulême','17':'La Rochelle','18':'Bourges','19':'Tulle','2A':'Ajaccio','2B':'Bastia',
    '21':'Dijon','22':'Saint-Brieuc','23':'Guéret','24':'Périgueux','25':'Besançon','26':'Valence','27':'Évreux','28':'Chartres','29':'Quimper','30':'Nîmes',
    '31':'Toulouse','32':'Auch','33':'Bordeaux','34':'Montpellier','35':'Rennes','36':'Châteauroux','37':'Tours','38':'Grenoble','39':'Lons-le-Saunier','40':'Mont-de-Marsan',
    '41':'Blois','42':'Saint-Étienne','43':'Le Puy-en-Velay','44':'Nantes','45':'Orléans','46':'Cahors','47':'Agen','48':'Mende','49':'Angers','50':'Saint-Lô',
    '51':'Châlons-en-Champagne','52':'Chaumont','53':'Laval','54':'Nancy','55':'Bar-le-Duc','56':'Vannes','57':'Metz','58':'Nevers','59':'Lille','60':'Beauvais',
    '61':'Alençon','62':'Arras','63':'Clermont-Ferrand','64':'Pau','65':'Tarbes','66':'Perpignan','67':'Strasbourg','68':'Colmar','69':'Lyon','70':'Vesoul',
    '71':'Mâcon','72':'Le Mans','73':'Chambéry','74':'Annecy','75':'Paris','76':'Rouen','77':'Melun','78':'Versailles','79':'Niort','80':'Amiens',
    '81':'Albi','82':'Montauban','83':'Toulon','84':'Avignon','85':'La Roche-sur-Yon','86':'Poitiers','87':'Limoges','88':'Épinal','89':'Auxerre','90':'Belfort',
    '91':'Évry-Courcouronnes','92':'Nanterre','93':'Bobigny','94':'Créteil','95':'Pontoise (chef-lieu ; préfecture à Cergy)',
    '971':'Basse-Terre','972':'Fort-de-France','973':'Cayenne','974':'Saint-Denis','976':'Mamoudzou'
  };
  const REGION_BY_CODE = {
    '11':'Île-de-France','24':'Centre-Val de Loire','27':'Bourgogne-Franche-Comté','28':'Normandie','32':'Hauts-de-France','44':'Grand Est',
    '52':'Pays de la Loire','53':'Bretagne','75':'Nouvelle-Aquitaine','76':'Occitanie','84':'Auvergne-Rhône-Alpes','93':'Provence-Alpes-Côte d’Azur',
    '94':'Corse','01':'Guadeloupe','02':'Martinique','03':'Guyane','04':'La Réunion','06':'Mayotte'
  };
  // PIB régional 2024, en millions d'euros (Insee ; données 2024 provisoires).
  const GDP_MILLIONS = {
    '11':865652,'24':91467,'27':95775,'28':117713,'32':197331,'44':197832,'52':147791,'53':126549,
    '75':223433,'76':221752,'84':346405,'93':217942,'94':13358,'01':11878,'02':10480,'03':5244,'04':24457,'06':null
  };
  const GDP_NOTE = {'01':'PIB de la Guadeloupe, y compris Saint-Martin, selon le champ Insee.','06':'Donnée de PIB 2024 non disponible dans le tableau régional Insee.'};

  // Provinces et pays historiques : la bannière est une reconstitution héraldique, pas un drapeau officiel du département.
  const HISTORIC_FOR = {
    '01':'bugey','02':'picardie','03':'bourbonnais','04':'provence','05':'dauphine','06':'nice','07':'vivarais','08':'champagne','09':'foix','10':'champagne',
    '11':'languedoc','12':'rouergue','13':'provence','14':'normandie','15':'auvergne','16':'angoumois','17':'saintonge','18':'berry','19':'limousin','2A':'corse','2B':'corse',
    '21':'bourgogne','22':'bretagne','23':'marche','24':'perigord','25':'franchecomte','26':'dauphine','27':'normandie','28':'orleanais','29':'bretagne','30':'languedoc',
    '31':'languedoc','32':'gascogne','33':'guyenne','34':'languedoc','35':'bretagne','36':'berry','37':'touraine','38':'dauphine','39':'franchecomte','40':'gascogne',
    '41':'orleanais','42':'forez','43':'velay','44':'bretagne','45':'orleanais','46':'quercy','47':'guyenne','48':'gevaudan','49':'anjou','50':'normandie',
    '51':'champagne','52':'champagne','53':'maine','54':'lorraine','55':'lorraine','56':'bretagne','57':'lorraine','58':'nivernais','59':'flandre','60':'picardie',
    '61':'normandie','62':'artois','63':'auvergne','64':'bearn','65':'bigorre','66':'roussillon','67':'alsace','68':'alsace','69':'lyonnais','70':'franchecomte',
    '71':'bourgogne','72':'maine','73':'savoie','74':'savoie','75':'iledefrance','76':'normandie','77':'iledefrance','78':'iledefrance','79':'poitou','80':'picardie',
    '81':'languedoc','82':'quercy','83':'provence','84':'comtat','85':'poitou','86':'poitou','87':'limousin','88':'lorraine','89':'bourgogne','90':'alsace',
    '91':'iledefrance','92':'iledefrance','93':'iledefrance','94':'iledefrance','95':'iledefrance',
    '971':'royalfrance','972':'royalfrance','973':'royalfrance','974':'royalfrance','976':'mayottehistoric'
  };
  const HISTORIC = {
    'bugey':{name:'Bugey et Bresse',kind:'lion',field:'#a52d35',ink:'#f0d377',note:'Aire historique du Bugey et de la Bresse, dans l’ancien ensemble savoyard puis français.'},
    'picardie':{name:'Picardie',kind:'fleur',field:'#c9d8e6',ink:'#b52d39',note:'Province historique de Picardie ; les limites départementales ne reprennent pas exactement celles de l’ancienne province.'},
    'bourbonnais':{name:'Bourbonnais',kind:'diagonal',field:'#1d3d72',ink:'#d8b94d',note:'Ancien duché de Bourbonnais.'},
    'provence':{name:'Provence',kind:'pales',field:'#f0d36b',ink:'#b52d34',note:'Ancien comté puis province de Provence.'},
    'dauphine':{name:'Dauphiné',kind:'dolphin',field:'#1b3c71',ink:'#e5c45a',note:'Ancien Dauphiné de Viennois, devenu province du royaume.'},
    'nice':{name:'Comté de Nice',kind:'cross',field:'#f4efe2',ink:'#b62935',note:'Comté de Nice, rattaché à la France en 1860.'},
    'vivarais':{name:'Vivarais',kind:'lion',field:'#e9e2cf',ink:'#b52d36',note:'Pays historique du Vivarais, dans l’ancien Languedoc.'},
    'champagne':{name:'Champagne',kind:'bend',field:'#2a6090',ink:'#f0e4c8',note:'Ancien comté de Champagne.'},
    'foix':{name:'Comté de Foix',kind:'pales',field:'#f2d36d',ink:'#b52c35',note:'Ancien comté de Foix.'},
    'languedoc':{name:'Languedoc',kind:'occitan',field:'#e7cd75',ink:'#b52b34',note:'Province historique du Languedoc, dont les limites variaient selon les périodes.'},
    'rouergue':{name:'Rouergue',kind:'lion',field:'#c02b35',ink:'#f0d276',note:'Ancien comté de Rouergue, traditionnellement rattaché à l’espace de Guyenne.'},
    'normandie':{name:'Normandie',kind:'leopards',field:'#bd2832',ink:'#e9c45a',note:'Duché de Normandie ; les deux léopards sont un emblème héraldique médiéval.'},
    'auvergne':{name:'Auvergne',kind:'gonfanons',field:'#e6c75d',ink:'#b52b34',note:'Ancien comté puis province d’Auvergne.'},
    'angoumois':{name:'Angoumois',kind:'lozenges',field:'#d8b84e',ink:'#b62b34',note:'Ancienne province d’Angoumois.'},
    'saintonge':{name:'Saintonge',kind:'cross',field:'#efe6d2',ink:'#b62b34',note:'Ancienne province de Saintonge.'},
    'berry':{name:'Berry',kind:'shieldfleur',field:'#bd2b34',ink:'#f0d16c',note:'Ancienne province du Berry.'},
    'limousin':{name:'Limousin',kind:'ermine',field:'#f1ead8',ink:'#1c2731',note:'Ancienne province du Limousin.'},
    'corse':{name:'Corse',kind:'moor',field:'#f4f0e4',ink:'#1e2730',note:'Étendard traditionnel corse à tête de Maure, associé à l’histoire de l’île depuis le XVIIIe siècle.'},
    'bourgogne':{name:'Bourgogne',kind:'quarterly',field:'#1b376b',ink:'#e8c45b',note:'Armes du duché de Bourgogne, notamment sous les Valois.'},
    'bretagne':{name:'Bretagne',kind:'ermine',field:'#f2eee2',ink:'#1b2028',note:'Hermine plain, emblème héraldique du duché de Bretagne.'},
    'marche':{name:'Marche',kind:'diagonal',field:'#1d3c70',ink:'#c32b36',note:'Ancienne province de la Marche.'},
    'perigord':{name:'Périgord',kind:'leopards',field:'#c02c34',ink:'#edd078',note:'Périgord, pays historique de l’ancienne Guyenne.'},
    'franchecomte':{name:'Franche-Comté',kind:'eagle',field:'#28618b',ink:'#e5ca6e',note:'Ancienne province de Franche-Comté, issue du comté de Bourgogne.'},
    'orleanais':{name:'Orléanais',kind:'fleur',field:'#203d72',ink:'#ebc85e',note:'Ancienne province de l’Orléanais.'},
    'gascogne':{name:'Gascogne',kind:'lion',field:'#c52d36',ink:'#f0d174',note:'Ancien duché et pays historique de Gascogne.'},
    'guyenne':{name:'Guyenne',kind:'leopards',field:'#e8cb6e',ink:'#b82c35',note:'Province historique de Guyenne ; certaines parties relevaient aussi de pays voisins.'},
    'touraine':{name:'Touraine',kind:'fleur',field:'#214477',ink:'#ebc95f',note:'Ancienne province de Touraine.'},
    'gevaudan':{name:'Gévaudan',kind:'lion',field:'#e9e1ce',ink:'#b32c35',note:'Pays historique du Gévaudan, dans l’ancien Languedoc.'},
    'anjou':{name:'Anjou',kind:'fleurborder',field:'#1e3c72',ink:'#e8c35a',note:'Ancien comté puis duché d’Anjou.'},
    'maine':{name:'Maine',kind:'fleurborder',field:'#203d73',ink:'#e7c55e',note:'Ancienne province du Maine.'},
    'lorraine':{name:'Lorraine',kind:'bend',field:'#e9c75b',ink:'#b52b35',note:'Duché de Lorraine ; l’alérion est un emblème historique lorrain.'},
    'flandre':{name:'Flandre',kind:'lion',field:'#e8c94b',ink:'#1b2027',note:'Comté de Flandre ; le lion noir sur champ d’or est son emblème historique.'},
    'artois':{name:'Artois',kind:'fleur',field:'#244578',ink:'#ebc85f',note:'Ancien comté puis province d’Artois.'},
    'bearn':{name:'Béarn',kind:'cows',field:'#efce64',ink:'#b82d35',note:'Ancienne vicomté puis principauté de Béarn ; le blason traditionnel porte deux vaches.'},
    'bigorre':{name:'Bigorre',kind:'leopards',field:'#e5c75e',ink:'#b52d35',note:'Ancien comté de Bigorre, dans l’espace historique de Gascogne.'},
    'roussillon':{name:'Roussillon',kind:'pales',field:'#e9cf69',ink:'#b52b36',note:'Ancien comté de Roussillon, dans l’espace catalan.'},
    'alsace':{name:'Alsace',kind:'alsace',field:'#f3eee3',ink:'#c12d36',note:'Armoiries historiques d’Alsace ; le territoire de Belfort appartenait à l’ancien Haut-Rhin avant 1871.'},
    'lyonnais':{name:'Lyonnais',kind:'fleur',field:'#203d72',ink:'#e6c55d',note:'Ancienne province du Lyonnais.'},
    'nivernais':{name:'Nivernais',kind:'diagonalblue',field:'#e8c95c',ink:'#244477',note:'Ancien duché puis province du Nivernais.'},
    'forez':{name:'Forez',kind:'lion',field:'#1f3d70',ink:'#e7c65c',note:'Ancien comté de Forez, intégré à l’espace du Lyonnais.'},
    'velay':{name:'Velay',kind:'fleur',field:'#244477',ink:'#ebc75c',note:'Pays historique du Velay, dans l’ancien Languedoc.'},
    'poitou':{name:'Poitou',kind:'lozenges',field:'#f0e7d3',ink:'#b82d36',note:'Ancienne province du Poitou.'},
    'quercy':{name:'Quercy',kind:'lion',field:'#c02d37',ink:'#efd27a',note:'Ancien pays de Quercy, traditionnellement rattaché à la Guyenne.'},
    'comtat':{name:'Comtat Venaissin',kind:'keys',field:'#e8c45d',ink:'#b82c34',note:'Ancien territoire pontifical du Comtat Venaissin, annexé à la France en 1791.'},
    'savoie':{name:'Duché de Savoie',kind:'cross',field:'#b82d35',ink:'#f3eee2',note:'Maison et duché de Savoie ; la croix blanche sur rouge est l’emblème savoyard.'},
    'iledefrance':{name:'Île-de-France',kind:'fleur',field:'#203c70',ink:'#f0d17a',note:'Étendard aux fleurs de lis, emblématique du domaine royal de France.'},
    'royalfrance':{name:'Pavillon royal français',kind:'royal',field:'#203b72',ink:'#efd071',note:'Bannière royale à fleurs de lis, référence à l’autorité française d’Ancien Régime en contexte colonial ; ce n’est pas un drapeau local propre au département.'},
    'mayottehistoric':{name:'Pavillon français à Mayotte (1841–1946)',kind:'tricolour',field:'#fff',ink:'#1b2730',note:'Pour Mayotte, la source historique consultée documente l’usage du drapeau français durant la période coloniale (1841–1946) ; aucun drapeau provincial comparable à ceux de l’Hexagone n’est attribué.'}
  };

  const fmt = new Intl.NumberFormat('fr-FR');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fleur = (x,y,s,c) => `<path d="M ${x} ${y-s*1.1} C ${x-s*.42} ${y-s*.48}, ${x-s*.38} ${y-s*.12}, ${x} ${y+s*.12} C ${x+s*.38} ${y-s*.12}, ${x+s*.42} ${y-s*.48}, ${x} ${y-s*1.1} M ${x} ${y-s*.05} C ${x-s*.8} ${y-s*.4}, ${x-s*.95} ${y+s*.2}, ${x-s*.22} ${y+s*.35} L ${x} ${y+s*.1} L ${x+s*.22} ${y+s*.35} C ${x+s*.95} ${y+s*.2}, ${x+s*.8} ${y-s*.4}, ${x} ${y-s*.05} M ${x} ${y+s*.15} L ${x-s*.28} ${y+s*.82} L ${x} ${y+s*.68} L ${x+s*.28} ${y+s*.82} Z" fill="${c}"/>`;
  const lion = (x,y,s,c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M-43 10 Q-30 -16 -8 -11 Q8 -24 24 -8 L34 3 L25 17 L10 18 L5 38 L-2 38 L-1 18 L-20 19 L-27 38 L-34 38 L-31 15 Q-48 23 -52 7 Z"/><circle cx="23" cy="-14" r="12"/><path d="M31 -17 Q48 -23 47 -39 Q66 -27 52 -9 Q47 -3 39 -5" fill="none" stroke-width="5"/><path d="M-4 17 L-13 38 M13 15 L22 37" fill="none" stroke-width="6"/></g>`;
  const ermineSpot = (x,y,s,c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}" stroke="${c}" stroke-width="1.8"><path d="M0 0 C-7 -9 -8 -18 -5 -24 C-1 -18 1 -15 0 -10 C4 -16 8 -20 12 -22 C12 -12 7 -5 0 0 Z"/><circle cx="0" cy="5" r="4"/></g>`;
  function flagSvg(def){
    const w=240,h=150,c=def.ink,f=def.field; let motifs='';
    const addFleurs=(positions)=>positions.forEach(([x,y,s])=>{motifs+=fleur(x,y,s,c);});
    const addLions=(positions)=>positions.forEach(([x,y,s])=>{motifs+=lion(x,y,s,c);});
    switch(def.kind){
      case 'ermine': case 'ermineBorder':
        for(let row=0;row<3;row++) for(let col=0;col<5;col++) motifs+=ermineSpot(28+col*46+(row%2)*21,28+row*43,.72,c);
        if(def.kind==='ermineBorder') motifs+=`<rect x="5" y="5" width="230" height="140" fill="none" stroke="#b52d36" stroke-width="9"/>`;
        break;
      case 'fleur': addFleurs([[60,54,18],[120,54,18],[180,54,18],[60,112,18],[120,112,18],[180,112,18]]); break;
      case 'fleurborder': addFleurs([[60,55,20],[120,55,20],[180,55,20],[60,110,20],[120,110,20],[180,110,20]]); motifs+=`<rect x="7" y="7" width="226" height="136" fill="none" stroke="#b62d36" stroke-width="9"/>`; break;
      case 'leopards': addLions([[120,42,.68],[120,83,.68],[120,124,.68]]); break;
      case 'lion': addLions([[120,81,1.12]]); break;
      case 'pales': motifs+=`<path d="M48 0V150 M96 0V150 M144 0V150 M192 0V150" stroke="${c}" stroke-width="24"/>`; break;
      case 'cross': motifs+=`<rect x="100" y="0" width="40" height="150" fill="${c}"/><rect x="0" y="55" width="240" height="40" fill="${c}"/>`; break;
      case 'bend': motifs+=`<path d="M-25 20 L20 -25 L265 130 L220 175 Z" fill="${c}"/><path d="M82 47 l9 -12 9 12 -9 12z M117 68 l9 -12 9 12 -9 12z M152 90 l9 -12 9 12 -9 12z" fill="#f7f0dc"/>`; break;
      case 'diagonal': motifs+=`<path d="M-20 25 L25 -20 L260 125 L215 170 Z" fill="${c}"/>`; addFleurs([[75,43,12],[120,72,12],[165,101,12]]); break;
      case 'diagonalblue': motifs+=`<path d="M-20 25 L25 -20 L260 125 L215 170 Z" fill="${c}"/>`; break;
      case 'quarterly': motifs+=`<path d="M0 0H120V75H0Z M120 75H240V150H120Z" fill="#bd2d36"/>`; addFleurs([[48,38,12],[84,38,12],[156,112,12],[192,112,12]]); break;
      case 'occitan': motifs+=`<path d="M103 18H137V58H177V92H137V132H103V92H63V58H103Z" fill="${c}"/>`; [[103,24],[137,24],[177,58],[177,92],[137,132],[103,132],[63,92],[63,58]].forEach(([x,y])=>motifs+=`<circle cx="${x}" cy="${y}" r="7" fill="${c}"/>`); break;
      case 'dolphin': motifs+=`<path d="M42 88 Q85 24 154 58 Q184 72 205 45 Q207 79 171 99 Q132 122 90 106 Q65 99 42 88Z" fill="${c}"/><path d="M117 60 Q135 24 157 34 Q147 58 136 68Z" fill="${c}"/><path d="M91 105 Q77 136 48 132 Q69 111 73 96Z" fill="${c}"/><circle cx="174" cy="73" r="3" fill="${f}"/>`; break;
      case 'gonfanons': motifs+=`<path d="M38 28H79V112L58 95L38 112Z M99 17H140V101L119 84L99 101Z M160 28H201V112L180 95L160 112Z" fill="${c}" stroke="#b62d36" stroke-width="5"/>`; break;
      case 'lozenges': motifs+=`<path d="M0 0H240V150H0Z" fill="${f}"/>`; for(let r=0;r<3;r++)for(let col=0;col<5;col++) motifs+=`<path d="M${24+col*48+(r%2)*24} ${25+r*48} l22 22 -22 22 -22 -22z" fill="${c}"/>`; break;
      case 'shieldfleur': motifs+=`<path d="M64 15H176V82Q170 120 120 140Q70 120 64 82Z" fill="${c}" stroke="#ecd178" stroke-width="3"/>`; addFleurs([[120,52,17],[95,86,12],[145,86,12]]); break;
      case 'eagle': motifs+=`<path d="M120 28 Q90 12 60 25 L92 55 L48 49 L86 79 L63 102 L108 94 L120 130 L132 94 L177 102 L154 79 L192 49 L148 55 L180 25 Q150 12 120 28Z" fill="${c}"/><path d="M113 34L120 18L127 34L120 42Z" fill="#bd2d36"/>`; break;
      case 'cows':
        for(const x of [72,166]) motifs+=`<g transform="translate(${x} 78)" fill="${c}" stroke="${c}" stroke-width="3"><ellipse cx="0" cy="0" rx="29" ry="16"/><circle cx="27" cy="-8" r="10"/><path d="M23 -17l-8 -9 M31 -17l8 -9 M-19 12l-4 22 M0 13l0 22 M17 11l5 24" fill="none" stroke-width="5"/><path d="M-27 -4q-17 -15 -14 -28" fill="none" stroke-width="4"/></g>`;
        break;
      case 'alsace': motifs+=`<path d="M0 0H240V48H0Z" fill="${c}"/><path d="M0 102H240V150H0Z" fill="${c}"/><path d="M0 48H240V102H0Z" fill="#f7f0df"/>`; break;
      case 'keys': motifs+=`<g fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round"><path d="M72 100L166 44 M166 44a14 14 0 1 0 -25 -12a14 14 0 0 0 25 12 M124 70l16 23 M139 61l15 22"/><path d="M168 104L74 50 M74 50a14 14 0 1 1 25 -12a14 14 0 0 1 -25 12 M114 73l-14 24 M100 65l-15 22"/></g>`; break;
      case 'bird': motifs+=`<path d="M52 100 Q75 50 119 72 Q148 44 179 69 Q157 77 146 96 Q114 127 80 108Z" fill="${c}"/><path d="M164 70L208 54L184 86Z" fill="${c}"/>`; break;
      case 'chevron': motifs+=`<path d="M0 18L120 88L240 18V68L120 138L0 68Z" fill="${c}"/>`; break;
      case 'royal': addFleurs([[60,45,18],[120,45,18],[180,45,18],[60,108,18],[120,108,18],[180,108,18]]); motifs+=`<rect x="8" y="8" width="224" height="134" fill="none" stroke="#e4c15b" stroke-width="4"/>`; break;
      case 'tricolour': motifs+=`<rect width="80" height="150" fill="#1c376d"/><rect x="80" width="80" height="150" fill="#f6f0e5"/><rect x="160" width="80" height="150" fill="#bd3039"/>`; break;
    }
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 150"><rect width="240" height="150" rx="4" fill="${f}"/>${motifs}<rect x="2" y="2" width="236" height="146" rx="4" fill="none" stroke="rgba(16,24,34,.55)" stroke-width="4"/></svg>`;
    return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
  }
  function formatGDP(codeRegion){
    const value=GDP_MILLIONS[codeRegion];
    if(value==null) return 'Non disponible pour 2024';
    return (value/1000).toLocaleString('fr-FR',{minimumFractionDigits:1,maximumFractionDigits:1})+' Md€';
  }
  const dialog=document.getElementById('franceDepartmentPopup');
  const body=document.getElementById('franceDepartmentPopupContent');
  if(!dialog || !body) return;
  dialog.querySelector('[data-close-department-popup]')?.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  window.addEventListener('keydown',event=>{if(event.key==='Escape' && dialog.open) dialog.close();});

  window.openDepartmentPopup = function(code){
    const regionCode=window.LYS_DEPARTMENT_REGION_CODES?.[code] || (['971','972','973','974','976'].includes(code)?({'971':'01','972':'02','973':'03','974':'04','976':'06'}[code]):null);
    const name=window.LYS_DEPARTMENT_NAMES?.[code] || code;
    const population=POP[code];
    const pref=PREFECTURES[code] || 'Non renseignée';
    const region=REGION_BY_CODE[regionCode] || (['971','972','973','974','976'].includes(code)?name:'Région non renseignée');
    const flagKey=HISTORIC_FOR[code] || 'iledefrance';
    const flag=HISTORIC[flagKey];
    const isMayotte=code==='976';
    const isDrom=['971','972','973','974','976'].includes(code);
    const popYear=isMayotte?'1er janvier 2026':'population de référence 2023';
    const popNote=isMayotte?'Premier résultat du recensement exhaustif 2026, en attente d’authentification par décret.':'Population municipale de référence, entrée en vigueur le 1er janvier 2026 ; date statistique : 1er janvier 2023.';
    const territoryNuance = ({'17':'Le département actuel recoupe notamment l’Aunis et la Saintonge.','47':'Le Lot-et-Garonne réunit des territoires d’Agenais et de Guyenne.','59':'Le Nord actuel recoupe notamment la Flandre, le Hainaut et le Cambrésis ; la bannière retenue est celle de la Flandre comme repère historique.','62':'Le Pas-de-Calais réunit notamment l’Artois et le Boulonnais ; la bannière retenue est celle de l’Artois.','64':'Les Pyrénées-Atlantiques réunissent le Béarn et des territoires basques (Labourd, Basse-Navarre, Soule) ; la bannière béarnaise ne représente qu’une partie de cette histoire.','90':'Le Territoire de Belfort appartenait à l’ancien Haut-Rhin avant 1871.','971':'Le pavillon royal français est présenté comme référence de l’administration coloniale, pas comme un drapeau propre à la Guadeloupe.','972':'Le pavillon royal français est présenté comme référence de l’administration coloniale, pas comme un drapeau propre à la Martinique.','973':'Le pavillon royal français est présenté comme référence de l’administration coloniale, pas comme un drapeau propre à la Guyane.','974':'L’île a été appelée île Bourbon ; le pavillon rappelle le cadre monarchique français de cette période.','976':'Le drapeau français est documenté pour la période coloniale de 1841 à 1946 ; aucun drapeau provincial historique n’est attribué à Mayotte.'})[code] || '';
    const historicNote=flag.note+(territoryNuance?' '+territoryNuance:(isDrom?' Le pavillon affiché est une référence historique de l’administration française ou de la période coloniale, pas un drapeau local actuel.':' Les frontières des anciennes provinces diffèrent des limites départementales actuelles ; ce rattachement est indicatif.'));
    const gdpNote=GDP_NOTE[regionCode] || 'PIB régional 2024, données provisoires Insee.';
    body.innerHTML=`
      <div class="department-popup-topline"><span>FICHE TERRITORIALE</span><span class="department-popup-code">${esc(code)}</span></div>
      <div class="department-popup-hero">
        <div class="department-popup-flag-wrap"><img class="department-popup-flag" src="${flagSvg(flag)}" alt="Reconstitution héraldique historique : ${esc(flag.name)}"><span>ÉTENDARD HISTORIQUE</span></div>
        <div class="department-popup-heading"><span class="department-popup-eyebrow">${isDrom?'DÉPARTEMENT ET RÉGION D’OUTRE-MER':'DÉPARTEMENT MÉTROPOLITAIN'}</span><h3 id="franceDepartmentPopupTitle">${esc(name)}</h3><p>${esc(region)} · Code INSEE ${esc(code)}</p><span class="department-popup-province">Référence : ${esc(flag.name)}</span></div>
      </div>
      <div class="department-popup-stats">
        <div class="department-popup-stat department-popup-pop"><span>POPULATION</span><strong>${population==null?'Non disponible':fmt.format(population)}</strong><small>${esc(popYear)}</small></div>
        <div class="department-popup-stat"><span>PRÉFECTURE / CHEF-LIEU</span><strong>${esc(pref)}</strong><small>Siège administratif départemental</small></div>
        <div class="department-popup-stat department-popup-gdp"><span>PIB DE LA RÉGION</span><strong>${esc(formatGDP(regionCode))}</strong><small>${esc(region)} · 2024</small></div>
      </div>
      <div class="department-popup-notes"><p><strong>À propos de la bannière.</strong> ${esc(historicNote)}</p><p><strong>Population.</strong> ${esc(popNote)}</p><p><strong>PIB.</strong> ${esc(gdpNote)}</p></div>
      <div class="department-popup-sources"><span>SOURCES ET REPÈRES</span><a href="https://www.insee.fr/fr/statistiques/8680659" target="_blank" rel="noopener noreferrer">Insee · populations départementales ↗</a><a href="https://www.insee.fr/fr/statistiques/2012723" target="_blank" rel="noopener noreferrer">Insee · PIB régional 2024 ↗</a><a href="https://geo.api.gouv.fr/decoupage-administratif/departements" target="_blank" rel="noopener noreferrer">API Géo · découpage administratif ↗</a><a href="https://www.memorial-genweb.org/heraldique/provinces.php" target="_blank" rel="noopener noreferrer">FranceGenWeb · anciennes provinces ↗</a><a href="https://www.drapeaux-sfv.org/drapeaux-de-france/article/drapeaux-des-regions" target="_blank" rel="noopener noreferrer">Société française de vexillologie ↗</a></div>
      <div class="department-popup-disclaimer">Les drapeaux départementaux officiels n’existent généralement pas : la bannière montrée est une reconstitution décorative inspirée de l’héraldique d’une province historique associée au territoire, et non un emblème administratif contemporain.</div>`;
    if(typeof dialog.showModal==='function') { if(!dialog.open) dialog.showModal(); }
    else dialog.setAttribute('open','');
  };
})();
