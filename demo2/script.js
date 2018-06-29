var ecArray = new Array;

$(function(){
  bundleItemClick();
  mainProductsSelect();
  $('#AddToCart').on('click',function(){
    ecAddCartSend();
  });
});

// 合わせ買い商品をクリックしたときの関数
function bundleItemClick(){
  $('.bundle-item').on('click',function(){
    $(this).toggleClass('selected');
    var variant = $(this).attr('data-variant');
    if( $(this).hasClass('selected') ){
      var sku = $(this).attr('data-sku');
      var price = $(this).attr('data-price');
      var type = $(this).attr('data-type');
      $('#PurchaseBundleItems').append('<input name="id[]" type="hidden" value="'+variant+'" data-sku="'+sku+'" data-price="'+price+'" data-type="'+type+'">');
    }else{
      $('input[value="'+variant+'"]').remove();
    }
    totalPrice();
  });
}

// 商品のバリエーションを選択したときの関数
function mainProductsSelect(){
  $('#mainProducts-select').on('change',function(){
    var sku = $('.mainProducts-option:selected').attr('data-sku');
    var variant = $('.mainProducts-option:selected').val();
    var price = $('.mainProducts-option:selected').attr('data-price');
    var title = $('.mainProducts-option:selected').attr('data-title');
    $('#mainProductsItem').val(variant);
    $('#mainProductsItem').attr('data-sku',sku);
    $('#mainProductsItem').attr('data-price',price);
    $('#mainProductsItem').attr('data-title',title);
    totalPrice();
  });
}

// 総額を出力する関数
function totalPrice(){
  var total = 0;
  $('input[name="id[]"]').each(function(){
    total += Number($(this).attr('data-price'));
  });
  var totalPrice = (total/100).toString().replace(/(\d)(?=(\d{3})+$)/g , '$1,');
  $('#totalPrice').text('¥'+totalPrice);
  ecArrayMake();
}

// ecArrayを作成する関数
function ecArrayMake(){
  ecArray = [];  
  $('input[name="id[]"]').each(function(){
    ecArray.push({
      sku: $(this).attr('data-sku'),
      title: $(this).attr('data-title'),
      price: Number($(this).attr('data-price'))/100,
      type: $(this).attr('data-type')
    });
  });
}

// google analytics 拡張eコーマス「商品がカートに追加された回数」を送信する関数
function ecAddCartSend(){
  ga("set", "&cu", "JPY");
  for( i in ecArray ){
    ga("ec:addProduct",{
      id: ecArray[i].sku ,
      name:ecArray[i].title ,
      category:ecArray[i].type ,
      quantity: 1,
      price:ecArray[i].price,
      brand: "brand",
      variant: null,
      currency: "JPY"
    });
  }   
  ga('ec:setAction', 'add');
}
