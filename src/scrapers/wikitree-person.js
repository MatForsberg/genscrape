var debug = require('debug')('wikitree-person'),
    utils = require('../utils');

var urls = [
  utils.urlPatternToRegex('http://www.wikitree.com/wiki/*-*'),
  //utils.urlPatternToRegex('http://person.ancestryinstitution.com/tree/*/person/*')
];

module.exports = function(register){
  register(urls, run);
};

/**
 * Called when the URL matches.
 * Retrieve HTML for facts tab and process.
 * We do this even if we're already on the facts tab
 * because it's easier to just always request is as
 * opposed to detecting which tab we start on.
 */
function run(emitter) {
  
  debug('run');

  
  var personData = {};
  
  // Gather list of events. Store in map keyed by event title.
  // In the future if we want to gather events that could occur multiple times,
  // such as residence, then we'll need to change this to an array.
  var facts = {};
  //
  //$dom.find('#factsSection .LifeEvent').each(function(){
  //  var $card = $(this),
  //      name = $card.find('.cardSubtitle').text().toLowerCase().trim(),
  //      value = $card.find('.cardTitle');
  //  facts[name] = value;
  //});
  
  // Name
  
  //var nameParts =  utils.splitName( .text() );
  personData.givenName = $('span[itemprop="givenName"]').text();
  personData.familyName = $('meta[itemprop="familyName"]').attr('content');
  // Vitals
  
  //if(facts.birth){
  //  var birth = processEvent(facts.birth);
  personData.birthDate = $('time[itemprop="birthDate"]').attr('datetime');
  personData.birthPlace = $('span[itemtype="http://schema.org/Event"][itemprop="birth"] span[itemtype="http://schema.org/Place"][itemprop="location"] span[itemprop="name"]').text();
  //}
  //
  //if(facts.death){
  //  var death = processEvent(facts.death);
  personData.deathDate = $('time[itemprop="deathDate"]').attr('datetime');
  personData.deathPlace = $('span[itemtype="http://schema.org/Event"][itemprop="death"] span[itemtype="http://schema.org/Place"][itemprop="location"] span[itemprop="name"]').text();

  //}
  //
  //// Relationships
  //
  //var $lists = $dom.find('#familySection > .researchList'),
  //    $parents = $lists.first().find('.card'),
      $father = $('span[itemtype="http://schema.org/Person"][itemprop="parent"] a[title~=father]>span[itemprop="name"]').text();
      $mother = $('span[itemtype="http://schema.org/Person"][itemprop="parent"] a[title~=mother]>span[itemprop="name"]').text();

  //

    var fatherNameParts = getNameParts($father);
    personData.fatherGivenName = fatherNameParts[0];
    personData.fatherFamilyName = parseLastName(fatherNameParts[1]);

  //
    var motherNameParts = getNameParts($mother);
    personData.motherGivenName = motherNameParts[0];
    personData.motherFamilyName = parseLastName(motherNameParts[1].replace('(','').replace(')',''));

  //
  //var $spouse = $lists.eq(1).find('.card').first();
  //if(!$spouse.is('.cardEmpty')){
  //  var spouseNameParts = getNameParts($spouse);
  //  personData.spouseGivenName = spouseNameParts[0];
  //  personData.spouseFamilyName = spouseNameParts[1];
  //}
  //
  // TODO: get marriage event that matches this spouse
  var i = 0;
  emitter.emit('data', utils.clean(personData));
}
/**
 * Get the name parts from a relative's card
 */
function getNameParts(name){
  return name.split('  ');
}
function parseLastName(name){
  return name.split(' ')[0];
}
