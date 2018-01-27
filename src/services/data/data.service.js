const wookieeToEnglish = (json) => {
  let replacedJson = json;
  if (typeof json === 'object') {
    replacedJson = JSON.stringify(json);
  }
  replacedJson = replacedJson.replace(/whhuanan/g, null);
  replacedJson = replacedJson.replace(/oaoohuwhao/g, 'count');
  replacedJson = replacedJson.replace(/akrcwohoahoohuc/g, 'previous');
  replacedJson = replacedJson.replace(/whwokao/g, 'next');
  replacedJson = replacedJson.replace(/acaoaoakc/g, 'https');
  replacedJson = replacedJson.replace(/cohraakah.oaoo/g, 'swapi.co');
  replacedJson = replacedJson.replace(/raakah/g, 'api');
  replacedJson = replacedJson.replace(/akwoooakanwo/g, 'people');
  replacedJson = replacedJson.replace(/akrarrwo/g, 'page');
  replacedJson = replacedJson.replace(/wwoorcscraao/g, 'format');
  replacedJson = replacedJson.replace(/ohooooorahwowo/g, 'wookiee');
  replacedJson = replacedJson.replace(/rcwochuanaoc/g, 'results');
  replacedJson = replacedJson.replace(/whrascwo/g, 'name');
  replacedJson = replacedJson.replace(/acwoahrracao/g, 'height');
  replacedJson = replacedJson.replace(/scracc/g, 'mass');
  replacedJson = replacedJson.replace(/acraahrc_oaooanoorcc/g, 'hair_colors');
  replacedJson = replacedJson.replace(/acraahrc_oaooanoorc/g, 'hair_color');
  replacedJson = replacedJson.replace(/corahwh_oaooanoorcc/g, 'skin_colors');
  replacedJson = replacedJson.replace(/corahwh_oaooanoorc/g, 'skin_color');
  replacedJson = replacedJson.replace(/worowo_oaooanoorcc/g, 'eye_colors');
  replacedJson = replacedJson.replace(/worowo_oaooanoorc/g, 'eye_color');
  replacedJson = replacedJson.replace(/rhahrcaoac_roworarc/g, 'birth_year');
  replacedJson = replacedJson.replace(/rrwowhwaworc/g, 'gender');
  replacedJson = replacedJson.replace(/acooscwoohoorcanwa/g, 'homeworld');
  replacedJson = replacedJson.replace(/wwahanscc/g, 'films');
  replacedJson = replacedJson.replace(/cakwooaahwoc/g, 'species');
  replacedJson = replacedJson.replace(/howoacahoaanwoc/g, 'vehicles');
  replacedJson = replacedJson.replace(/caorarccacahakc/g, 'starships');
  replacedJson = replacedJson.replace(/oarcworaaowowa/g, 'created');
  replacedJson = replacedJson.replace(/wowaahaowowa/g, 'edited');
  replacedJson = replacedJson.replace(/hurcan/g, 'url');

  replacedJson = replacedJson.replace(/akooakhuanraaoahoowh/g, 'population');
  replacedJson = replacedJson.replace(/aoworcrcraahwh/g, 'terrain');
  replacedJson = replacedJson.replace(/churcwwraoawo_ohraaoworc/g, 'surface_water');
  replacedJson = replacedJson.replace(/oaanahscraaowo/g, 'climate');
  replacedJson = replacedJson.replace(/oorcrhahaoraan_akworcahoowa/g, 'orbital_period');
  replacedJson = replacedJson.replace(/rcooaoraaoahoowh_akworcahoowa/g, 'rotation_period');
  replacedJson = replacedJson.replace(/rcwocahwawowhaoc/g, 'residents');
  replacedJson = replacedJson.replace(/rrrcrahoahaoro/g, 'gravity');
  replacedJson = replacedJson.replace(/waahrascwoaoworc/g, 'diameter');

  replacedJson = replacedJson.replace(/anrawhrrhurarrwo/g, 'language');
  replacedJson = replacedJson.replace(/oaanraccahwwahoaraaoahoowh/g, 'classification');
  replacedJson = replacedJson.replace(/rahoworcrarrwo_anahwwwocakrawh/g, 'average_lifespan');
  replacedJson = replacedJson.replace(/rahoworcrarrwo_height/g, 'average_height');
  replacedJson = replacedJson.replace(/wawocahrrwhraaoahoowh/g, 'designation');


  return JSON.parse(replacedJson);
};

export default wookieeToEnglish;
