var fs = require('fs');
var Q = require('q');

var Metalsmith = require('metalsmith'),
  less = require('metalsmith-less'),
  markdown = require('metalsmith-markdown'),
  templates = require('metalsmith-templates'),
  Handlebars = require('handlebars'),
  collections = require('metalsmith-collections'),
  permalinks = require('metalsmith-permalinks');


Handlebars.registerHelper('title2link', function(options) {
  return options.replace(/\W+/g, '-').toLowerCase();
});

Handlebars.registerHelper('shortDate', function(datetime) {
  //console.log(datetime instanceof Date);
  //  console.log(datetime);
  var strDate = datetime.getFullYear() + '-' +
    ('0' + (datetime.getMonth() + 1)).slice(-2) + '-' +
    ('0' + datetime.getDate()).slice(-2);
  //  console.log(strDate);
  return strDate;
});

Handlebars.registerHelper('longDate', function(datetime) {
  //console.log(datetime instanceof Date);
  //  console.log(datetime);
  var strDate = datetime.toLocaleString('en-us', {
      month: 'long'
    }) + ' ' +
    datetime.getDate() + ', ' +
    datetime.getFullYear();

  //  console.log(strDate);
  return strDate;
});

Handlebars.registerHelper('first', function(context, num, options) {
  var ret = '',
    ctx = context.slice(0, num);
  for (var i = 0; i < ctx.length; i++) ret += options.fn(ctx[i]);
  return ret;
});


var partials = [
  'gtm',
  'meta',
  'header',
  'slidebar',
  'footer',
  'scripts'
];

Q.all(partials.map(function(name) {
    return Q.nbind(fs.readFile, fs)(__dirname + '/templates/partials/' + name + '.hbs', 'utf-8');
  }))
  .spread(function(
    gtm,
    meta,
    header,
    slidebar,
    footer,
    scripts
  ) {
    Handlebars.registerPartial('meta', meta);
    Handlebars.registerPartial('gtm', gtm);
    Handlebars.registerPartial('header', header);
    Handlebars.registerPartial('slidebar', slidebar);
    Handlebars.registerPartial('footer', footer);
    Handlebars.registerPartial('scripts', scripts);

    return true;
  })
  .then(function() {

    Metalsmith(__dirname)

    .use(less({
      pattern: 'styles/style.less'
    }))


    .use(collections({
      pages: {
        pattern: 'content/pages/*.md'
      },
      blog: {
        pattern: 'content/blog/*.md',
        sortBy: 'date',
        reverse: true
      },
      releases: {
        pattern: 'content/releases/*.md',
        sortBy: 'date',
        reverse: true
      }
    }))


    .use(markdown())
      .use(templates('handlebars'))

    .use(permalinks({
      pattern: ':collection/:title'
    }))


    .destination('./build')
      .build(function(err) {
        if (err) {
          console.log(err, err.stack);
        }
      });
  })
  .fail(function(err) {
    console.error('failed to read partials', err, err.stack);
  });
