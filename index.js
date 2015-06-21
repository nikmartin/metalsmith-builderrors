var fs = require('fs');

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


function readPartial(name) {
  return fs.readFileSync(__dirname + '/templates/partials/' +
    name + '.hbs', 'utf-8');
}

Handlebars.registerPartial('meta', readPartial('meta'));
Handlebars.registerPartial('gtm', readPartial('gtm'));
Handlebars.registerPartial('header', readPartial('header'));
Handlebars.registerPartial('slidebar', readPartial('slidebar'));
Handlebars.registerPartial('footer', readPartial('footer'));
Handlebars.registerPartial('scripts', readPartial('scripts'));

Metalsmith(__dirname)

.use(less({
  pattern: 'styles/style.less'
}))


.use(collections({
    pages: {
      pattern: '*.md',
    },
    blog: {
      pattern: 'blog/*.md',
      sortBy: 'date',
      reverse: true
    },
    releases: {
      pattern: 'releases/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown())
  .use(templates('handlebars'))
  .use(permalinks({
    relative: false,
    pattern: ':collection/:title'
  }))
  .destination('./build')
  .build(function(err) {
    if (err) {
      console.log(err, err.stack);
    }
  });
