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
    '51':'Châlons-en-Champagne','52':'Chaumont','53':'Laval','54': '7 septembre 1871 (création après l’annexion allemande de l’Alsace-Lorraine)','55':'Bar-le-Duc','56':'Vannes','57':'Metz','58':'Nevers','59':'Lille','60':'Beauvais',
    '61':'Alençon','62':'Arras','63':'Clermont-Ferrand','64':'Pau','65':'Tarbes','66':'Perpignan','67':'Strasbourg','68':'Colmar','69':'Lyon','70':'Vesoul',
    '71':'Mâcon','72':'Le Mans','73':'Chambéry','74':'Annecy','75': '4 mars 1790 (premier département de Paris ; organisation territoriale actuelle depuis le 1er janvier 1968)','76':'Rouen','77':'Melun','78':'Versailles','79':'Niort','80':'Amiens',
    '81':'Albi','82':'Montauban','83':'Toulon','84':'Avignon','85':'La Roche-sur-Yon','86':'Poitiers','87':'Limoges','88':'Épinal','89':'Auxerre','90':'Belfort',
    '91':'Évry-Courcouronnes','92':'Nanterre','93':'Bobigny','94':'Créteil','95':'Pontoise (chef-lieu ; préfecture à Cergy)',
    '971':'Basse-Terre','972':'Fort-de-France','973':'Cayenne','974':'Saint-Denis','976':'Mamoudzou'
  };
  const REGION_BY_CODE = {
    '11':'Île-de-France','24':'Centre-Val de Loire','27':'Bourgogne-Franche-Comté','28':'Normandie','32':'Hauts-de-France','44':'Grand Est',
    '52':'Pays de la Loire','53':'Bretagne','75': '4 mars 1790 (premier département de Paris ; organisation territoriale actuelle depuis le 1er janvier 1968)','76':'Occitanie','84':'Auvergne-Rhône-Alpes','93':'Provence-Alpes-Côte d’Azur',
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
    '51':'champagne','52':'champagne','53':'maine','54': '7 septembre 1871 (création après l’annexion allemande de l’Alsace-Lorraine)','55':'lorraine','56':'bretagne','57':'lorraine','58':'nivernais','59':'flandre','60':'picardie',
    '61':'normandie','62':'artois','63':'auvergne','64':'bearn','65':'bigorre','66':'roussillon','67':'alsace','68':'alsace','69':'lyonnais','70':'franchecomte',
    '71':'bourgogne','72':'maine','73':'savoie','74':'savoie','75': '4 mars 1790 (premier département de Paris ; organisation territoriale actuelle depuis le 1er janvier 1968)','76':'normandie','77':'iledefrance','78':'iledefrance','79':'poitou','80':'picardie',
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

  // Drapeaux départementaux héraldiques et bannières de provinces historiques, tous liés à leurs fiches Commons.
  const DEPARTMENT_FLAGS = {
    "02": "Drapeau fr département Aisne.svg",
    "03": "Drapeau fr département Allier.svg",
    "04": "Drapeau fr département Alpes-de-Haute-Provence.svg",
    "07": "Drapeau fr département Ardèche.svg",
    "08": "Drapeau fr département Ardennes.svg",
    "10": "Drapeau fr département Aube.svg",
    "11": "Drapeau traditionnel fr département Aude.svg",
    "15": "Drapeau fr département Cantal.svg",
    "18": "Drapeau fr département Cher.svg",
    "19": "Drapeau département fr Corrèze.svg",
    "22": "Drapeau fr département Côtes-d'Armor.svg",
    "23": "Drapeau fr département Creuse.svg",
    "24": "Drapeau fr département Dordogne.svg",
    "29": "Drapeau Finistère.svg",
    "36": "Drapeau département fr Indre.svg",
    "40": "Drapeau fr département Landes.svg",
    "41": "Drapeau fr département Loir-et-Cher.svg",
    "42": "Drapeau fr département Loire.svg",
    "45": "Drapeau fr département Loiret.svg",
    "47": "Drapeau fr département Lot-et-Garonne.svg",
    "49": "Drapeau fr département Maine-et-Loire.svg",
    "51": "Drapeau fr département Marne.svg",
    "52": "Drapeau fr département Haute-Marne.svg",
    "53": "Drapeau fr département Mayenne.svg",
    "54": "Drapeau fr département Meurthe-et-Moselle.svg",
    "55": "Drapeau fr département Meuse.svg",
    "56": "Drapeau fr département Morbihan.svg",
    "57": "Drapeau fr département Moselle.svg",
    "58": "Drapeau fr département Nièvre.svg",
    "60": "Drapeau fr département Oise.svg",
    "68": "Drapeau Haut-Rhin.svg",
    "70": "Drapeau fr département Haute-Saône.svg",
    "79": "Drapeau fr département Deux-Sèvres.svg",
    "80": "Drapeau fr département Somme.svg",
    "81": "Drapeau fr département Tarn.svg",
    "83": "Drapeau fr département Var.svg",
    "84": "Drapeau fr département Vaucluse.svg",
    "86": "Drapeau fr département Vienne.svg",
    "87": "Drapeau fr département Haute-Vienne.svg",
    "90": "Drapeau fr département Territoire de Belfort.svg",
    "91": "Drapeau fr département Essonne.svg",
    "92": "Drapeau fr département Hauts-de-Seine.svg",
    "95": "Drapeau fr département Val-d'Oise.svg",
    "2A": "Flag of Corsica (before 1755).svg",
    "2B": "Flag of the Anglo-Corsican Kingdom.svg",
    "971": "Flag of Guadeloupe (local) variant.svg",
    "972": "Drapeau aux serpents de la Martinique.svg",
    "973": "Flag of French Guiana.svg",
    "974": "ReunionRadiantVolcanoFlag.png",
    "976": "Banner of arms of Mayotte.svg",
    "05": "Flag of Hautes-Alpes.svg",
    "16": "Flag of Charente.svg",
    "26": "Flag of the Department of Drôme.svg",
    "27": "Drapeau de Normandie.svg",
    "31": "Banner of the County of Toulouse (2 by 3).svg",
    "33": "Flag of Gironde.svg",
    "34": "Flag of Languedoc.svg",
    "38": "Flag of Dauphiné.svg",
    "39": "Flag of Jura (department).svg",
    "43": "Bannière héraldique du Velay.svg",
    "44": "Drapeau fr département Loire-Atlantique.svg",
    "46": "Bannière historique du Quercy.svg",
    "48": "Bannière historique du Gévaudan.svg",
    "50": "Drapeau de Normandie.svg",
    "59": "Flag of Flanders.svg",
    "61": "Flag of Orne.svg",
    "65": "Flag of the Department of Hautes-Pyrénées.svg",
    "71": "Flag of Burgundy.svg",
    "74": "Flag of Haute-Savoie Departement.jpg",
    "75": "Flag of Paris with coat of arms.svg",
    "76": "Drapeau de Normandie.svg",
    "77": "Drapeau culturel pour le département de Seine-et-Marne.svg",
    "78": "Drapeau fr département Yvelines.svg",
    "82": "Flag of Tarn-et-Garonne.svg",
    "89": "Drapeau fr département Yonne.svg",
    "93": "Cultural flag of Île-de-France.svg",
    "94": "Cultural flag of Île-de-France.svg",
};
  const PROVINCE_FLAGS = {"bugey": "Flag of Bugey.svg", "picardie": "Drapeau de la Picardie.svg", "bourbonnais": "Flag of Bourbonnais.svg", "provence": "Drapeau de Provence « ancien ».svg", "dauphine": "Flag of Dauphiné.svg", "nice": "Flag of the County of Nice.svg", "foix": "Flag of the County of Foix.svg", "rouergue": "Flag of Rouergue.svg", "normandie": "Drapeau de Normandie.svg", "saintonge": "Drapeau de la Saintonge.svg", "berry": "Flag of Berry.svg", "limousin": "Drapeau du Limousin.svg", "corse": "Drapeau de la Corse.svg", "bourgogne": "Flag of Burgundy.svg", "marche": "Drapeau de la Marche.svg", "franchecomte": "Drapeau de la Franche-Comté.svg", "orleanais": "Flag of Orléanais.svg", "gascogne": "Gascogne flag.svg", "touraine": "Flag of Touraine.svg", "anjou": "Drapeau de la province d'Anjou.svg", "maine": "Flag of Maine (province).svg", "lorraine": "Drapeau de la Lorraine.svg", "artois": "Flag of Artois.svg", "bearn": "Flag of Béarn.svg", "lyonnais": "Flag of Lyonnais.svg", "nivernais": "Flag of Nivernais (province).svg", "poitou": "Drapeau du Poitou.svg", "savoie": "Flag of Savoie.svg", "auvergne": "Flag of Auvergne.svg", "languedoc": "Flag of Languedoc.svg", "roussillon": "Flag of Roussillon.svg", "alsace": "Flag of Alsace (historical).svg", "bretagne": "Drapeau de la province de Bretagne (1532).svg"};
    const DEPARTMENT_FLAG_META = {"2A":{"label":"ÉTENDARD CORSE HISTORIQUE · AVANT 1755","alt":"Étendard historique de la Corse avant 1755","note":"Étendard insulaire corse antérieur à 1755, documenté par une source historique. Il concerne l'île entière et non spécifiquement le département de Corse-du-Sud, créé en 1976."},"2B":{"label":"ÉTENDARD DU ROYAUME ANGLO-CORSE · 1794–1796","alt":"Drapeau historique du Royaume anglo-corse de 1794 à 1796","note":"Drapeau historique du Royaume anglo-corse (1794–1796). Il est utilisé ici comme repère historique de l'île, et non comme drapeau propre au département de Haute-Corse."},"971":{"label":"DRAPEAU LOCAL GUADELOUPÉEN · NON OFFICIEL","alt":"Drapeau local non officiel de la Guadeloupe, motif héraldique soleil et canne à sucre","note":"Drapeau local non officiel de la Guadeloupe, issu d'une ancienne collection vexillologique : fleurs de lys, soleil et canne à sucre. Il s'agit d'un symbole local et non du drapeau officiel de l'État français, qui demeure le tricolore."},"972":{"label":"DRAPEAU AUX SERPENTS · EMBLÈME HISTORIQUE COLONIAL","alt":"Drapeau aux serpents associé à l’iconographie coloniale de la Martinique","note":"Emblème aux serpents dérivé d'un ancien écusson de la gendarmerie en région Antilles-Guyane. Son iconographie est liée à l'histoire coloniale et fait l'objet de controverses ; il est présenté comme document historique, pas comme drapeau officiel ni comme symbole consensuel actuel."},"973":{"label":"DRAPEAU TERRITORIAL GUYANAIS · 2010","alt":"Drapeau local de la Guyane, vert et jaune avec étoile rouge","note":"Drapeau vert et jaune à étoile rouge, adopté par le Conseil général de Guyane le 29 janvier 2010. Il s'agit d'un emblème territorial local, distinct du drapeau national français."},"974":{"label":"DRAPEAU LOCAL DE FACTO · MAHAVÉLI / VOLCAN RAYONNANT","alt":"Drapeau local de facto Mahavéli, également appelé Volcan rayonnant, associé à La Réunion","note":"Mahavéli (Volcan rayonnant) : drapeau local non officiel conçu en 1975, sélectionné le 1er mars 2003 par le jury de l’Association Réunionnaise de Vexillologie, puis largement accepté de facto localement dans les années 2010–2014. Il ne s’agit pas du drapeau officiel de La Réunion : le drapeau national officiel demeure le tricolore français. Source vexillologique : Flags of the World (FOTW)."},"976":{"label":"BANNIÈRE HÉRALDIQUE DES ARMOIRIES DE MAYOTTE","alt":"Bannière héraldique reprenant les armoiries de Mayotte","note":"Bannière héraldique reprenant les armoiries de Mayotte, publiée en 2023. C'est une représentation vexillologique locale des armes, non un drapeau officiellement adopté ni un étendard historique."}};
  const PROVINCE_FLAG_OWNER = {};
  Object.keys(HISTORIC_FOR).forEach(code => {
    const province = HISTORIC_FOR[code];
    if (!DEPARTMENT_FLAGS[code] && PROVINCE_FLAGS[province] && !PROVINCE_FLAG_OWNER[province]) {
      PROVINCE_FLAG_OWNER[province] = code;
    }
  });
  const DEPARTMENT_HISTORY = {
    "01": "Le territoire actuel rassemble une partie de la Bresse, du Bugey, de la Dombes et du pays de Gex. Ces terres furent partagées entre seigneuries savoyardes et possessions bourguignonnes ; l’essentiel passa sous souveraineté française après le traité de Lyon de 1601.",
    "02": "L’Aisne recoupe les pays du Laonnois, du Soissonnais, du Tardenois et du Vermandois, dans l’ancienne Picardie. Laon fut un centre majeur de la monarchie capétienne, tandis que le Soissonnais occupa une place importante dans l’histoire franque et médiévale.",
    "03": "L’Allier correspond largement au Bourbonnais, ancienne seigneurie devenue duché et berceau de la maison de Bourbon. Moulins fut la capitale du duché ; ses biens furent confisqués à la suite de la révolte du connétable de Bourbon au XVIe siècle.",
    "04": "Le territoire s’inscrit en Haute-Provence, autour de Digne, Sisteron, Forcalquier et Barcelonnette. Il appartenait au comté de Provence, rattaché à la couronne française en 1481 ; les vallées alpines conservèrent longtemps des usages et communautés montagnardes spécifiques.",
    "05": "Les Hautes-Alpes couvrent les anciens pays du Briançonnais, de l’Embrunais et du Gapençais, au cœur du Dauphiné. Les passages alpins, cols et fortifications en firent une zone stratégique entre France, Savoie et États italiens ; le Dauphiné fut cédé à la France en 1349.",
    "06": "Le territoire réunit le comté de Nice et l’ancien arrondissement de Grasse, entre Alpes et Méditerranée. Le comté de Nice resta lié à la maison de Savoie jusqu’au rattachement à la France en 1860 ; le département fut alors reconstitué.",
    "07": "L’Ardèche correspond en grande partie au Vivarais, ancien pays du Languedoc organisé autour de Viviers et des vallées du Rhône. Les communautés du Vivarais connurent les guerres de Religion et conservèrent de fortes traditions rurales et protestantes dans certaines zones.",
    "08": "Les Ardennes réunissent des terres historiquement partagées entre Champagne, principauté de Sedan et pays de Mézières. Sedan fut un centre seigneurial puis une principauté indépendante avant son rattachement à la France en 1642 ; la frontière ardennaise eut un rôle militaire majeur.",
    "09": "L’Ariège recoupe l’ancien comté de Foix, le Couserans et les hautes vallées pyrénéennes. Le comté de Foix fut une puissance féodale importante, liée à la maison de Foix-Béarn ; ses forteresses et vallées furent au cœur des conflits féodaux et religieux du Midi.",
    "10": "L’Aube s’inscrit dans l’ancienne Champagne, autour de Troyes, Bar-sur-Aube et du pays d’Othe. Les foires de Champagne des XIIe et XIIIe siècles firent de Troyes un carrefour commercial européen ; le comté fut intégré au domaine royal au début du XIVe siècle.",
    "11": "L’Aude recoupe le Carcassès, le Narbonnais et des territoires du Languedoc. Carcassonne fut une place forte majeure pendant la croisade contre les Albigeois ; le littoral narbonnais et les Corbières conservent les traces des pouvoirs romains, vicomtaux et royaux.",
    "12": "L’Aveyron correspond à l’essentiel du Rouergue, ancien comté organisé autour de Rodez, Millau et Villefranche. Le Rouergue passa sous l’influence du comté de Toulouse puis de la couronne ; les bastides médiévales témoignent de cette histoire.",
    "13": "Les Bouches-du-Rhône réunissent la Provence maritime, le pays d’Arles et le pays d’Aix. Marseille conserva longtemps ses franchises et son autonomie municipale ; le comté de Provence passa à la couronne de France en 1481.",
    "14": "Le Calvados appartient à la Normandie historique, notamment au Bessin, au pays d’Auge et à la plaine de Caen. La Normandie naquit du traité de Saint-Clair-sur-Epte en 911 ; elle devint un duché puissant avant d’être réunie au domaine capétien en 1204.",
    "15": "Le Cantal couvre une grande partie de la Haute-Auvergne, autour d’Aurillac, Saint-Flour et des monts du Cantal. L’Auvergne fut partagée entre comté et dauphiné d’Auvergne ; elle entra progressivement dans l’orbite royale aux XIIIe et XIVe siècles.",
    "16": "La Charente correspond largement à l’Angoumois, ancien comté centré sur Angoulême. L’Angoumois fut lié aux Plantagenêts puis revint à la couronne après la guerre de Cent Ans ; ses châteaux et abbayes témoignent de cette position entre Poitou et Aquitaine.",
    "17": "La Charente-Maritime réunit l’Aunis et la Saintonge, autour de La Rochelle, Saintes et Rochefort. La Rochelle devint un port majeur et un bastion protestant au XVIe siècle ; l’Aunis et la Saintonge furent des territoires stratégiques pendant les guerres de Religion.",
    "18": "Le Cher est au cœur du Berry, ancienne province centrée sur Bourges. Le duché de Berry fut notamment confié à Jean de Berry au XIVe siècle ; Bourges fut un centre politique, religieux et universitaire majeur à la fin du Moyen Âge.",
    "19": "La Corrèze appartient au Limousin, terre des vicomtés de Limoges, Comborn et Turenne. Tulle et Brive structurèrent des pays de moyenne montagne et de vallées ; le Limousin fut progressivement intégré au domaine royal.",
    "2A": "La Corse-du-Sud fut marquée par les influences de Pise et de Gênes, puis par la République corse de Pascal Paoli proclamée en 1755. La France prit possession de l’île en 1768 ; la division en Corse-du-Sud et Haute-Corse intervint en 1976.",
    "2B": "La Haute-Corse fut marquée par les influences de Pise et de Gênes, puis par la République corse de Pascal Paoli proclamée en 1755. La France prit possession de l’île en 1768 ; la division en Corse-du-Sud et Haute-Corse intervint en 1976.",
    "21": "La Côte-d’Or recouvre le cœur du duché de Bourgogne, dont Dijon fut la capitale. Les ducs Valois constituèrent aux XIVe et XVe siècles un puissant ensemble territorial ; après la mort de Charles le Téméraire en 1477, le duché fut repris par la couronne.",
    "22": "Les Côtes-d’Armor recoupent le Trégor, le Goëlo, le Penthièvre et une partie du diocèse de Saint-Brieuc, en Bretagne. Le duché de Bretagne conserva une large autonomie avant l’union à la couronne française en 1532.",
    "23": "La Creuse correspond en partie au comté de la Marche et à la Combraille. La Marche forma une zone frontière entre Limousin, Berry et Auvergne ; ses seigneuries et châteaux gardèrent une forte identité féodale jusqu’à l’époque moderne.",
    "24": "La Dordogne correspond largement au Périgord, ancien comté autour de Périgueux et Sarlat. La région fut disputée pendant la guerre de Cent Ans entre Plantagenêts et Capétiens ; ses châteaux témoignent de cette frontière historique.",
    "25": "Le Doubs relève de la Franche-Comté, ancien comté de Bourgogne, longtemps sous influence des Habsbourg. Besançon fut ville impériale libre avant d’être conquise par Louis XIV ; la province fut définitivement annexée en 1678.",
    "26": "La Drôme recoupe le Valentinois, le Diois et la partie méridionale du Dauphiné. Le comté de Valentinois et le Diois eurent des seigneuries propres ; le Dauphiné fut transféré à la France en 1349.",
    "27": "L’Eure appartient à la Normandie, notamment au Roumois, au Vexin normand et à l’ancien comté d’Évreux. La région forma l’une des marches du duché normand face au domaine royal capétien ; Évreux fut un centre comtal important.",
    "28": "L’Eure-et-Loir réunit des terres du Drouais, du Perche et de l’Orléanais, autour de Chartres. Le comté de Chartres et le pays chartrain furent étroitement liés au domaine royal ; la cathédrale de Chartres demeure un haut lieu du royaume médiéval.",
    "29": "Le Finistère recoupe le Léon, la Cornouaille et le pays de Brest, au sein du duché de Bretagne. Les évêchés de Quimper, Léon et Saint-Pol-de-Léon structurèrent longtemps les pays bretons ; Brest devint ensuite un grand port militaire.",
    "30": "Le Gard appartient au Languedoc et recoupe le Nîmois, l’Uzège et les Cévennes méridionales. Nîmes conserve un héritage romain majeur ; Uzès fut un ancien comté et duché, tandis que les Cévennes furent marquées par les guerres de Religion et la révolte camisarde.",
    "31": "La Haute-Garonne rassemble le Toulousain, le Comminges et une partie du Lauragais. Toulouse fut la capitale du puissant comté de Toulouse, dont la bannière à croix occitane est l’une des identités héraldiques majeures du Midi ; le comté fut intégré au domaine royal après la croisade albigeoise.",
    "32": "Le Gers est au cœur de la Gascogne, avec l’Armagnac, le Fezensac et l’Astarac. Le comté d’Armagnac joua un rôle politique majeur aux XIVe et XVe siècles, notamment pendant la guerre de Cent Ans ; Auch fut un siège ecclésiastique important.",
    "33": "La Gironde recoupe la Guyenne, le Bordelais, le Médoc, le Bazadais et l’Entre-deux-Mers. Bordeaux fut un centre du duché d’Aquitaine et des possessions Plantagenêt ; la reconquête française de 1453 mit fin à la domination anglaise sur la Guyenne.",
    "34": "L’Hérault se situe au cœur du Languedoc, autour de Montpellier, Béziers, Agde et Lodève. Ces villes furent des centres épiscopaux, marchands et universitaires ; le territoire passa sous autorité royale après les grands conflits du XIIIe siècle.",
    "35": "L’Ille-et-Vilaine réunit le pays de Rennes, le pays de Saint-Malo, le Dol et les marches de Bretagne. Rennes fut l’une des principales villes du duché ; Saint-Malo développa une forte tradition maritime et corsaire.",
    "36": "L’Indre appartient au Berry, autour de Châteauroux, Issoudun et de la Brenne. Le Berry fut un duché apanagé au Moyen Âge, associé à Jean de Berry et à la cour princière ; ses campagnes furent intégrées au domaine royal.",
    "37": "L’Indre-et-Loire correspond au cœur de la Touraine, ancien comté puis province autour de Tours. Les Plantagenêts y possédèrent de vastes domaines avant la conquête capétienne de 1204 ; la Loire et ses châteaux devinrent un axe majeur du pouvoir royal.",
    "38": "L’Isère se situe au cœur du Dauphiné, ancien Dauphiné de Viennois, autour de Grenoble, Vienne et du Grésivaudan. En 1349, Humbert II céda le Dauphiné au roi de France ; le titre de dauphin fut ensuite réservé à l’héritier du trône.",
    "39": "Le Jura relève de la Franche-Comté, ancien comté de Bourgogne, et rassemble le Revermont, le pays de Dole et le vignoble d’Arbois. La région passa des Habsbourg à la France après les conquêtes de Louis XIV, confirmées en 1678.",
    "40": "Les Landes recoupent la Gascogne, le Marsan, la Chalosse et l’ancien domaine d’Albret. La région fut liée aux maisons de Navarre et d’Albret ; les paysages de landes furent profondément transformés par les grands travaux forestiers du XIXe siècle.",
    "41": "Le Loir-et-Cher réunit le Blaisois, le Vendômois et la Sologne, entre Orléanais et Touraine. Le comté de Blois joua un rôle féodal majeur, notamment avec les maisons de Blois-Champagne ; Blois devint ensuite une résidence royale.",
    "42": "La Loire correspond en grande partie au Forez, ancien comté autour de Montbrison et Saint-Étienne. Le département fut formé en 1793 par la division du Rhône-et-Loire ; le Forez passa progressivement sous influence des Bourbons puis de la couronne.",
    "43": "La Haute-Loire recoupe le Velay, le Brivadois et les pays du Puy. Le Velay fut structuré autour de l’évêché du Puy, important centre de pèlerinage sur la route de Saint-Jacques ; ses seigneuries et baronnies s’inscrivaient dans l’ancien gouvernement de Languedoc.",
    "44": "La Loire-Atlantique correspond à l’ancien pays de Nantes, cœur du comté puis du duché de Bretagne. Nantes fut une capitale ducale majeure ; le département, créé sous le nom de Loire-Inférieure en 1790, prit son nom actuel en 1957.",
    "45": "Le Loiret appartient à l’Orléanais et au Gâtinais, autour d’Orléans, Gien et Montargis. Orléans fut une ville royale stratégique pendant la guerre de Cent Ans ; le duché d’Orléans était un apanage important de la famille royale.",
    "46": "Le Lot correspond largement au Quercy, autour de Cahors, Figeac et Gourdon. Cahors fut une ville épiscopale et marchande ; le Quercy, d’abord lié au comté de Toulouse, fut intégré au domaine royal au XIIIe siècle.",
    "47": "Le Lot-et-Garonne réunit l’Agenais, l’Albret et des marges de Guyenne et de Gascogne. Nérac fut une résidence de la maison d’Albret ; Henri de Navarre, futur Henri IV, y séjourna avant son accession au trône.",
    "48": "La Lozère correspond au Gévaudan, ancien pays et comté autour de Mende et de Marvejols, intégré au Languedoc. La région resta marquée par ses institutions épiscopales et seigneuriales ; l’épisode de la Bête du Gévaudan (1764–1767) a marqué son histoire.",
    "49": "Le Maine-et-Loire couvre l’Anjou, ancien comté puis duché autour d’Angers et Saumur. La maison d’Anjou donna plusieurs dynasties en Europe, notamment les Plantagenêts ; l’Anjou fut réuni au domaine royal en 1481.",
    "50": "La Manche recoupe le Cotentin, l’Avranchin et le nord de la Normandie. Le Mont-Saint-Michel, les ports du Cotentin et les îles Anglo-Normandes voisines témoignent de son rôle frontalier et maritime ; la Normandie fut réunie au domaine royal en 1204.",
    "51": "La Marne se situe dans l’ancienne Champagne, autour de Reims, Châlons et Épernay. Reims devint le lieu traditionnel du sacre des rois de France ; les foires de Champagne firent prospérer la région au Moyen Âge.",
    "52": "La Haute-Marne réunit des parties de la Champagne et du Barrois, autour de Langres, Chaumont et Joinville. Langres fut un ancien siège épiscopal et Joinville une seigneurie majeure ; les frontières provinciales y étaient particulièrement imbriquées.",
    "53": "La Mayenne relève de l’ancien Maine, avec les comtés de Laval et de Mayenne. Laval fut un centre seigneurial important ; le Maine fut disputé entre Anjou, Normandie et royaume de France avant son rattachement à la couronne.",
    "54": "La Meurthe-et-Moselle est issue du redécoupage de 1871 après l’annexion allemande de l’Alsace-Lorraine. Elle rassemble des territoires de l’ancienne Lorraine restés français, notamment Nancy, Toul, Lunéville et Briey.",
    "55": "La Meuse appartient au Barrois et à la Lorraine, autour de Bar-le-Duc et Verdun. Le duché de Bar fut progressivement lié au duché de Lorraine ; Verdun, ville épiscopale des Trois-Évêchés, fut rattachée à la France en 1648.",
    "56": "Le Morbihan couvre le Vannetais, le pays de Lorient et une partie de la Bretagne intérieure. Vannes fut l’ancien siège du comté et de l’évêché de Bro-Wened ; le golfe du Morbihan conserve de nombreux sites mégalithiques.",
    "57": "La Moselle correspond à une partie de la Lorraine historique, autour de Metz, Thionville et Sarreguemines. Metz fut une ville libre et épiscopale avant son intégration à la France en 1552 ; le département fut profondément transformé par les annexions de 1871 et 1919.",
    "58": "La Nièvre correspond au Nivernais, ancien comté puis duché autour de Nevers. La maison de Clèves puis les Gonzague gouvernèrent le duché ; il fut vendu à la couronne en 1659.",
    "59": "Le Nord réunit la Flandre française, le Hainaut et le Cambrésis. Lille, Douai, Valenciennes et Cambrai furent des places disputées entre France, Flandre, Bourgogne et Habsbourg ; les principales annexions françaises s’étalèrent du XVIIe au XVIIIe siècle.",
    "60": "L’Oise rassemble le Beauvaisis, le Valois, le Clermontois et des terres de Picardie. Compiègne fut un domaine de chasse royal, tandis que Senlis et Beauvais furent des centres médiévaux importants ; le Valois donna son nom à une dynastie capétienne.",
    "61": "L’Orne associe le Perche, l’Alençonnais et le pays d’Argentan, dans l’ancienne Normandie. Le comté puis duché d’Alençon fut un apanage princier ; le Perche forma une marche historique entre Normandie, Maine et Orléanais.",
    "62": "Le Pas-de-Calais recoupe l’Artois, le Boulonnais et le Calaisis. L’Artois passa sous les Habsbourg puis fut progressivement réuni à la France, notamment par le traité des Pyrénées de 1659 ; Boulogne fut un port stratégique de la Manche.",
    "63": "Le Puy-de-Dôme couvre le cœur de l’Auvergne, autour de Clermont, Riom et Issoire. Clermont fut une ancienne capitale comtale et épiscopale ; le comté d’Auvergne et le Dauphiné d’Auvergne eurent des trajectoires féodales distinctes.",
    "64": "Les Pyrénées-Atlantiques réunissent le Béarn et les pays basques du Labourd, de la Basse-Navarre et de la Soule. Le Béarn conserva longtemps ses institutions et ses fors ; Henri IV hérita du royaume de Navarre et du Béarn avant de devenir roi de France.",
    "65": "Les Hautes-Pyrénées recoupent le comté de Bigorre, le Lavedan, la Barousse, le Nébouzan et les Quatre-Vallées. La Bigorre fut une principauté pyrénéenne médiévale, passée sous l’autorité royale au début du XVIIe siècle ; Tarbes devint son principal centre administratif.",
    "66": "Les Pyrénées-Orientales correspondent au Roussillon et à une partie de la Cerdagne, territoires de culture catalane. Le Roussillon fut longtemps lié aux comtés catalans et à la couronne d’Aragon ; il fut cédé à la France par le traité des Pyrénées de 1659.",
    "67": "Le Bas-Rhin correspond à la Basse-Alsace, autour de Strasbourg, Haguenau et Saverne. L’Alsace fit partie du Saint-Empire avant son rattachement progressif à la France au XVIIe siècle ; Strasbourg fut annexée en 1681.",
    "68": "Le Haut-Rhin recoupe la Haute-Alsace et le Sundgau, anciens territoires des Habsbourg et de la Décapole. L’Alsace fut rattachée à la France au XVIIe siècle, puis annexée à l’Empire allemand en 1871 avant son retour en 1918.",
    "69": "Le Rhône couvre le Lyonnais et le Beaujolais méridional. Lyon fut une cité marchande et épiscopale majeure ; le département du Rhône fut créé en 1793 après la division du Rhône-et-Loire, puis son territoire fut réduit en 2015 avec la création de la Métropole de Lyon.",
    "70": "La Haute-Saône appartient à la Franche-Comté, ancien comté de Bourgogne, autour de Vesoul, Gray et Luxeuil. La région passa de la maison de Habsbourg à la couronne de France au XVIIe siècle, avec l’annexion confirmée en 1678.",
    "71": "La Saône-et-Loire rassemble l’Autunois, le Charolais, le Mâconnais et le Chalonnais, au sein de l’ancienne Bourgogne. Autun fut une cité antique, Mâcon un centre épiscopal et le Charolais un comté lié à la maison de Bourgogne.",
    "72": "La Sarthe appartient au Maine, ancien comté autour du Mans. Le Maine fut lié à l’Anjou et à la Normandie ; la maison Plantagenêt en est issue avant de régner sur l’Angleterre et de posséder de vastes terres en France.",
    "73": "La Savoie correspond à l’ancien duché de Savoie, gouverné par la maison du même nom. Chambéry fut une capitale ducale avant le déplacement de la cour à Turin ; le territoire fut rattaché à la France en 1860.",
    "74": "La Haute-Savoie réunit le Chablais, le Faucigny et le Genevois, anciennes possessions de la maison de Savoie. Annecy fut la capitale du Genevois ; le territoire fut rattaché à la France en 1860 après le traité de Turin et le plébiscite.",
    "75": "Paris est au cœur de l’Île-de-France, domaine des premiers rois capétiens. La ville passa de Lutèce à capitale royale, puis nationale ; le département actuel de Paris fut réorganisé lors de la réforme de 1964, mise en œuvre en 1968.",
    "76": "La Seine-Maritime correspond au pays de Caux, au pays de Bray, au Rouennais et au Vexin normand. Rouen fut la capitale du duché de Normandie et un grand port sur la Seine ; le département s’appela Seine-Inférieure jusqu’en 1955.",
    "77": "La Seine-et-Marne réunit la Brie, le Gâtinais français, le pays de Meaux, le Melunais et le Provinois. Ces territoires furent au cœur du domaine capétien et des grandes routes commerciales reliant Paris à la Champagne et à la Bourgogne.",
    "78": "Les Yvelines réunissent le Mantois, le Vexin français, l’Hurepoix et le pays de Versailles. Le territoire fut profondément marqué par le domaine royal et l’installation de la cour à Versailles ; le département fut créé en 1968 à partir de Seine-et-Oise.",
    "79": "Les Deux-Sèvres appartiennent au Poitou, entre Gâtine, Mellois et Niortais. Le comté de Poitou fut lié à Aliénor d’Aquitaine et aux Plantagenêts ; le territoire revint à la couronne française au XIIIe siècle.",
    "80": "La Somme correspond à l’Amiénois, au Ponthieu, au Santerre et à une partie de la Picardie maritime. Amiens fut une ville épiscopale et drapière majeure ; le Ponthieu forma un comté stratégique face à la Manche.",
    "81": "Le Tarn recoupe l’Albigeois et une partie du Languedoc toulousain. Albi fut le siège d’un puissant évêché et donna son nom aux Albigeois ; la région fut profondément marquée par la croisade contre les Cathares au XIIIe siècle.",
    "82": "Le Tarn-et-Garonne fut créé en 1808 à partir de portions du Quercy, du Rouergue, de la Gascogne et du Languedoc. Montauban, fondée comme bastide au XIIe siècle, fut un centre protestant important lors des guerres de Religion.",
    "83": "Le Var relève de la Provence historique, autour de Toulon, Draguignan et Brignoles. Toulon devint un grand port militaire royal ; le département prit le nom du fleuve Var, bien que celui-ci se trouve aujourd’hui en grande partie hors de ses limites.",
    "84": "Le Vaucluse recoupe le Comtat Venaissin, le pays d’Avignon et le Luberon. Le Comtat fut une possession pontificale pendant plusieurs siècles ; Avignon accueillit la papauté au XIVe siècle, et le territoire fut annexé à la France en 1791.",
    "85": "La Vendée correspond au Bas-Poitou, au bocage vendéen et au marais poitevin. Le département, créé en 1790 sous le nom de Vendée, fut le théâtre des guerres de Vendée de 1793 à 1796 pendant la Révolution.",
    "86": "La Vienne appartient au Poitou, autour de Poitiers, Loudun et du Châtelleraudais. Poitiers fut une capitale comtale et un centre religieux majeur ; la région fut marquée par la bataille de 732 et par les conflits de la guerre de Cent Ans.",
    "87": "La Haute-Vienne relève du Limousin, autour de Limoges et Saint-Junien. La vicomté de Limoges fut l’une des principales puissances féodales du Limousin ; la ville développa une réputation européenne pour ses émaux.",
    "88": "Les Vosges s’inscrivent dans l’ancienne Lorraine, avec des marges d’Alsace et de Franche-Comté. Le duché de Lorraine conserva son indépendance jusqu’à sa transmission à Stanislas Leszczynski, puis son rattachement à la France en 1766.",
    "89": "L’Yonne recoupe l’Auxerrois, le Tonnerrois, l’Avallonnais et la Puisaye, aux confins de la Bourgogne et de l’Île-de-France. Auxerre fut un siège épiscopal ancien ; les comtés et abbayes structurèrent le territoire médiéval.",
    "90": "Le Territoire de Belfort appartenait au Haut-Rhin et au Sundgau alsacien. Il resta français après l’annexion de l’Alsace-Moselle en 1871, fut administré comme territoire de Belfort, puis devint département en 1922.",
    "91": "L’Essonne recoupe l’Hurepoix et des terres de l’ancien domaine royal d’Île-de-France. Étampes, Dourdan et Corbeil furent des pôles seigneuriaux et marchands ; le département fut créé en 1968 après la disparition de Seine-et-Oise.",
    "92": "Les Hauts-de-Seine occupent une partie de l’ancien Parisis et de la boucle occidentale de la Seine. Sèvres, Saint-Cloud, Rueil et Nanterre furent liés aux domaines royaux, abbayes et résidences de la cour ; le département fut créé en 1968.",
    "93": "La Seine-Saint-Denis recoupe le Parisis et la Plaine de France, au nord de Paris. L’abbaye de Saint-Denis fut la nécropole des rois de France et un centre majeur du pouvoir capétien ; le département fut créé en 1968.",
    "94": "Le Val-de-Marne réunit des terres de la Brie, de l’Hurepoix et de la vallée de la Marne. Vincennes fut un domaine royal et son château une résidence importante des souverains ; le département fut créé en 1968.",
    "95": "Le Val-d’Oise rassemble le Vexin français, le pays de France et la vallée de Montmorency. Pontoise fut une place médiévale du domaine capétien ; le département fut créé en 1968 à partir de Seine-et-Oise.",
    "971": "La Guadeloupe est un archipel des Antilles marqué par les sociétés amérindiennes, la colonisation française à partir de 1635, l’esclavage et son abolition en 1848. Elle devint département en 1946 ; son histoire associe les îles de Basse-Terre, Grande-Terre, Marie-Galante et les Saintes.",
    "972": "La Martinique fut occupée par la France à partir de 1635 et structurée par l’économie de plantation et l’esclavage, aboli en 1848. Elle devint département en 1946 ; Fort-Royal, devenu Fort-de-France, fut le centre administratif et portuaire de l’île.",
    "973": "La Guyane fut explorée et colonisée par la France à partir du XVIIe siècle, avec une histoire marquée par les bagnes, les missions et les sociétés amérindiennes et marronnes. Elle devint département en 1946 ; Cayenne et les territoires de l’intérieur ont des trajectoires historiques distinctes.",
    "974": "La Réunion fut d’abord connue comme Bourbon, puis intégrée aux réseaux de la Compagnie des Indes et à l’empire colonial français à partir du XVIIe siècle. L’esclavage y fut aboli en 1848 et l’île devint département en 1946 ; son peuplement résulte de migrations multiples de l’océan Indien.",
    "976": "Mayotte fut liée aux sultanats comoriens avant son rattachement à la France en 1841. Son histoire est distincte de celle des autres îles de l’archipel des Comores ; elle devint département en 2011 après la consultation de 2009."
};
  const departmentHistory = code => DEPARTMENT_HISTORY[code] || HISTORIC[HISTORIC_FOR[code]]?.note || "Repères historiques en cours de rédaction.";
  const commonsFlagUrl = title => 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(title);
  const commonsFilePageUrl = title => 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(title.replace(/ /g, '_'));
  const DEPARTMENT_FLAG_DIRECT_URLS = {
    "43": "assets/department-flags/velay.svg",
    "46": "assets/department-flags/quercy.svg",
    "48": "assets/department-flags/gevaudan.svg",
    "974": "https://upload.wikimedia.org/wikipedia/commons/d/db/ReunionRadiantVolcanoFlag.png"
  };
  // Dates de création et de réorganisation des départements : exceptions à la date générale de 1790.
  const DEPARTMENT_CREATION = {
    default: '4 mars 1790 (mise en place de l’organisation départementale issue de la loi du 22 décembre 1789)',
    '06': '23 juin 1860 (département rétabli après une première existence de 1793 à 1814)',
    '2A': '1er janvier 1976 (division de l’ancien département de Corse ; loi du 15 mai 1975)',
    '2B': '1er janvier 1976 (division de l’ancien département de Corse ; loi du 15 mai 1975)',
    '42': '12 août 1793 (division de Rhône-et-Loire ; organisation confirmée en novembre 1793)',
    '54': '7 septembre 1871 (création après l’annexion d’une partie de la Meurthe et de la Moselle)',
    '69': '12 août 1793 (création après la division de Rhône-et-Loire)',
    '73': '15 juin 1860 (rattachement de la Savoie à la France et création du département)',
    '74': '15 juin 1860 (rattachement de la Savoie à la France et création du département)',
    '75': '4 mars 1790 (premier département de Paris ; réorganisation actuelle le 1er janvier 1968)',
    '78': '1er janvier 1968 (création issue du démembrement de Seine-et-Oise)',
    '82': '4 novembre 1808 (sénatus-consulte créant le Tarn-et-Garonne)',
    '84': '25 juin 1793 (création du département de Vaucluse)',
    '90': '11 mars 1922 (le Territoire de Belfort devient officiellement un département)',
    '91': '1er janvier 1968 (création issue du démembrement de Seine-et-Oise)',
    '92': '1er janvier 1968 (création issue du démembrement de la Seine)',
    '93': '1er janvier 1968 (création issue du démembrement de la Seine)',
    '94': '1er janvier 1968 (création issue du démembrement de la Seine)',
    '95': '1er janvier 1968 (création issue du démembrement de Seine-et-Oise)',
    '971': '19 mars 1946 (départementalisation de la Guadeloupe)',
    '972': '19 mars 1946 (départementalisation de la Martinique)',
    '973': '19 mars 1946 (départementalisation de la Guyane)',
    '974': '19 mars 1946 (départementalisation de La Réunion)',
    '976': '31 mars 2011 (départementalisation de Mayotte)'
  };
  const departmentCreationDate = code => DEPARTMENT_CREATION[code] || DEPARTMENT_CREATION.default;
  const fmt = new Intl.NumberFormat('fr-FR');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
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
    const flagKey=HISTORIC_FOR[code] || null;
    const flag=flagKey ? HISTORIC[flagKey] : null;
    const departmentFlag=DEPARTMENT_FLAGS[code] || null;
    const provinceFlag=(!departmentFlag && flagKey && PROVINCE_FLAG_OWNER[flagKey]===code) ? (PROVINCE_FLAGS[flagKey] || null) : null;
    const selectedFlag=departmentFlag || provinceFlag;
    const selectedFlagType=departmentFlag ? 'department' : (provinceFlag ? 'province' : null);
    const selectedFlagAlt=`Bannière héraldique ou historique associée au territoire de ${name}`;
    const isMayotte=code==='976';
    const isDrom=['971','972','973','974','976'].includes(code);
    const popYear=isMayotte?'1er janvier 2026':'population de référence 2023';
    const popNote=isMayotte?'Premier résultat du recensement exhaustif 2026, en attente d’authentification par décret.':'Population municipale de référence, entrée en vigueur le 1er janvier 2026 ; date statistique : 1er janvier 2023.';
    const historyText=departmentHistory(code);
    const gdpNote=GDP_NOTE[regionCode] || 'PIB régional 2024, données provisoires Insee.';
    body.innerHTML=`
      <div class="department-popup-topline"><span>FICHE TERRITORIALE</span><span class="department-popup-code">${esc(code)}</span></div>
      <div class="department-popup-hero">
        <div class="department-popup-flag-wrap"><div class="department-popup-flag-stage">${selectedFlag ? `<img class="department-popup-flag" src="${DEPARTMENT_FLAG_DIRECT_URLS[code] || commonsFlagUrl(selectedFlag)}" alt="${esc(selectedFlagAlt)}" loading="eager" decoding="async" referrerpolicy="no-referrer" draggable="false">` : ''}</div></div>
        <div class="department-popup-heading"><span class="department-popup-eyebrow">${isDrom?'DÉPARTEMENT ET RÉGION D’OUTRE-MER':'DÉPARTEMENT MÉTROPOLITAIN'}</span><h3 id="franceDepartmentPopupTitle">${esc(name)}</h3><p>${esc(region)} · Code INSEE ${esc(code)}</p></div>
      </div>
      <div class="department-popup-stats">
        <div class="department-popup-stat department-popup-pop"><span>POPULATION</span><strong>${population==null?'Non disponible':fmt.format(population)}</strong><small>${esc(popYear)}</small></div>
        <div class="department-popup-stat"><span>PRÉFECTURE / CHEF-LIEU</span><strong>${esc(pref)}</strong><small>Siège administratif départemental</small></div>
        <div class="department-popup-stat department-popup-gdp"><span>PIB DE LA RÉGION</span><strong>${esc(formatGDP(regionCode))}</strong><small>${esc(region)} · 2024</small></div>
      </div>
      <div class="department-popup-notes"><p><strong>Date de création.</strong> ${esc(departmentCreationDate(code))}.</p><p><strong>Repères historiques.</strong> ${esc(historyText)}</p><p><strong>Population.</strong> ${esc(popNote)}</p><p><strong>PIB.</strong> ${esc(gdpNote)}</p></div>
      <div class="department-popup-sources"><span>SOURCES ET REPÈRES</span><a href="https://www.insee.fr/fr/statistiques/8680659" target="_blank" rel="noopener noreferrer">Insee · populations départementales ↗</a><a href="https://www.insee.fr/fr/statistiques/2012723" target="_blank" rel="noopener noreferrer">Insee · PIB régional 2024 ↗</a><a href="https://geo.api.gouv.fr/decoupage-administratif/departements" target="_blank" rel="noopener noreferrer">API Géo · découpage administratif ↗</a><a href="https://www.vie-publique.fr/fiches/19606-organisation-territoriale-les-apports-de-la-revolution-francaise" target="_blank" rel="noopener noreferrer">Vie publique · création des départements ↗</a><a href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000868445" target="_blank" rel="noopener noreferrer">Légifrance · départementalisation de 1946 ↗</a><a href="https://www.insee.fr/fr/metadonnees/geographie/departement/976-mayotte" target="_blank" rel="noopener noreferrer">Insee · Mayotte ↗</a></div>`;
    body.querySelectorAll('img.department-popup-flag').forEach(img=>{
      img.addEventListener('error',()=>{
        const stage=img.closest('.department-popup-flag-stage');
        if(stage){stage.classList.add('department-popup-flag-missing');img.remove();}
      },{once:true});
    });
    if(typeof dialog.showModal==='function' && !dialog.open) {
      try { dialog.showModal(); }
      catch(error) { dialog.setAttribute('open',''); }
    } else if(typeof dialog.showModal!=='function') {
      dialog.setAttribute('open','');
    }
  };
})();
