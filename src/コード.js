function myFunction() {
  const getUrl = "https://cp.toyota.jp/rentacar/?padid=ag270_fr_sptop_onewayma";
  const spreadSheet = SpreadsheetApp.openById('1BJKQBU17O98otR1E0XKw9tUqijcvLygZ1r76fhVkLY8');
  const sheet = spreadSheet.getSheetByName('before')
  
  // htmlをテキスト情報にして抽出
  const html = UrlFetchApp.fetch(getUrl).getContentText('UTF-8');
  const departureList = Parser.data(html).from('\n        <p class="label-sp">出発<br>店舗</p>\n        <p>\n').to('<small>').iterate();
  const arrivalList = Parser.data(html).from('\n        <p class="label-sp">返却<br>店舗</p>\n        <p>\n').to('<small>').iterate();
  const carList = Parser.data(html).from('\n          <p class="label-sp">車種</p>\n          <p>').to('</p>').iterate();
  const departureDateList = Parser.data(html).from('<div class="service-item__info__date">\n            <p></p>').to('</p>').iterate();

  let i = 0;
  departureList.forEach(function(item){
    //console.log(item);
    sheet.getRange(i + 1, 1).setValue(item);
    sheet.getRange(i + 1, 2).setValue(arrivalList[i]);
    sheet.getRange(i + 1, 3).setValue(departureDateList[i]);
    sheet.getRange(i + 1, 4).setValue(carList[i]);
    i++;
  });
  
  //sheet.getRange(1, 1).setValue(html)
  
}
