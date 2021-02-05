let sslChecker = require('ssl-checker')
let fs = require('file-system');

let nameSites = ['archicad.fr', 'abvent.com', 'artlantis.com', 'twinlinker.com', 'vador.abvent.com', 'openbim.fr','assets.dev.twinlinker.com', 'assets.staging.twinlinker.com','assets.twinlinker.com', 'ivisit360.com', 'libecompta.com', 'climabim.fr', 'rhino3d.abvent.com', 'ch.abvent.com', 'nfr.abvent.com', 'twinmotion.abvent.com', 'bimoffice.fr', 'renderin.com', 'docs.archicad.fr', 'lesaint.abvent.com', 'shop.abvent.com', 'boutique.abvent.com', 'galerievu.com', 'agencevu.com', 'id.abvent.com', 'id-dev.abvent.com', 'live.abvent.com', 'education.abvent.com', 'education-dev.abvent.com', 'protection.abvent.com', 'downloads.abvent.com', 'forums.abvent.com', 'laboutiquevu.com' ];

// Problème avec : 'live-dev.abvent.com'


let data = [];
let promises = [];

nameSites.forEach(function (site) {
  let info_sslChecker = sslChecker(site)
    //J'ai jouter tout ce qu'il y a après sslChecker(site)
    .then(resp => {
      data.push({
        'name': site,
        'info': resp
      })
    }).catch((err) => {
      if (err.code === 'ENOTFOUND') {
        console.log("Please get back only or fix hostname");
        throw new Error('This is not an error. This is just to abort javascript');

      } else {
        console.error(err);
        throw new Error('This is not an other error. This is just to abort javascript');
      }
    });

  promises.push(info_sslChecker);
  //début du push dans le tableau
  // data.push('{ ' + site + ' [');
  // let test = data.push(info_sslChecker)

  // data.push(' ] }');
  //fin du push dans le tableau
});


Promise.all(promises).then(function (value) {
  console.log('BEGIN');
  console.log(data);
  console.log('END');


  //Écriture du fichier JSON
  // stringify JSON Object
  var jsonContent = JSON.stringify(data);

  fs.writeFile("data.json", jsonContent, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
  })
});