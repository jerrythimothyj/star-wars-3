export const wookieeToEnglish = (json) => {
  if (typeof json === 'object') {
    json = JSON.stringify(json);
  }
  json = json.replace(/whhuanan/g, null);
  json = json.replace(/oaoohuwhao/g, 'count');
  json = json.replace(/akrcwohoahoohuc/g, 'previous');
  json = json.replace(/whwokao/g, 'next');
  json = json.replace(/acaoaoakc/g, 'https');
  json = json.replace(/cohraakah.oaoo/g, 'swapi.co');
  json = json.replace(/raakah/g, 'api');
  json = json.replace(/akwoooakanwo/g, 'people');
  json = json.replace(/akrarrwo/g, 'page');
  json = json.replace(/wwoorcscraao/g, 'format');
  json = json.replace(/ohooooorahwowo/g, 'wookiee');
  json = json.replace(/rcwochuanaoc/g, 'results');
  json = json.replace(/whrascwo/g, 'name');
  json = json.replace(/acwoahrracao/g, 'height');
  json = json.replace(/scracc/g, 'mass');
  json = json.replace(/acraahrc_oaooanoorcc/g, 'hair_colors');
  json = json.replace(/acraahrc_oaooanoorc/g, 'hair_color');
  json = json.replace(/corahwh_oaooanoorcc/g, 'skin_colors');
  json = json.replace(/corahwh_oaooanoorc/g, 'skin_color');
  json = json.replace(/worowo_oaooanoorcc/g, 'eye_colors');
  json = json.replace(/worowo_oaooanoorc/g, 'eye_color');
  json = json.replace(/rhahrcaoac_roworarc/g, 'birth_year');
  json = json.replace(/rrwowhwaworc/g, 'gender');
  json = json.replace(/acooscwoohoorcanwa/g, 'homeworld');
  json = json.replace(/wwahanscc/g, 'films');
  json = json.replace(/cakwooaahwoc/g, 'species');
  json = json.replace(/howoacahoaanwoc/g, 'vehicles');
  json = json.replace(/caorarccacahakc/g, 'starships');
  json = json.replace(/oarcworaaowowa/g, 'created');
  json = json.replace(/wowaahaowowa/g, 'edited');
  json = json.replace(/hurcan/g, 'url');

  json = json.replace(/akooakhuanraaoahoowh/g, 'population');
  json = json.replace(/aoworcrcraahwh/g, 'terrain');
  json = json.replace(/churcwwraoawo_ohraaoworc/g, 'surface_water');
  json = json.replace(/oaanahscraaowo/g, 'climate');
  json = json.replace(/oorcrhahaoraan_akworcahoowa/g, 'orbital_period');
  json = json.replace(/rcooaoraaoahoowh_akworcahoowa/g, 'rotation_period');
  json = json.replace(/rcwocahwawowhaoc/g, 'residents');
  json = json.replace(/rrrcrahoahaoro/g, 'gravity');
  json = json.replace(/waahrascwoaoworc/g, 'diameter');

  json = json.replace(/anrawhrrhurarrwo/g, 'language');
  json = json.replace(/oaanraccahwwahoaraaoahoowh/g, 'classification');
  json = json.replace(/rahoworcrarrwo_anahwwwocakrawh/g, 'average_lifespan');
  json = json.replace(/rahoworcrarrwo_height/g, 'average_height');
  json = json.replace(/wawocahrrwhraaoahoowh/g, 'designation');


  return JSON.parse(json);
};

