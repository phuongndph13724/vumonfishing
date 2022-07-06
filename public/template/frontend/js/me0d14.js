/**
 * Desciption: Form đăng ký
 */
function formRegister(form) {
	var idForm 	= "#" + form;
	var urlAjax = "/form/add";
	var textBtn = $(idForm + ' .btnSuccess .btn').val();
		
	$.ajax({
		type: "POST",
		url: urlAjax,
		data: $(idForm).serialize(),
		dataType: "json",
		cache: false,
		beforeSend: function() {
			$('body').append('<div class="page-loading"><div class="loader"></div></div>');
			$(idForm + ' .form-group').removeClass('has-error');
			$(idForm + ' .alert').remove();
		},
		success: function(result){
			if(result.error) {
				$.each(result.error, function(key, value) {
					$(idForm + ' #input-'+ key).addClass('has-error');
				})
				$(idForm + ' .btnSuccess').prepend('<div class="alert alert-danger">Vui lòng điền đầy đủ các thông tin bắt buộc</div>');
			} else {
				$(idForm + ' .btnSuccess').prepend('<div class="alert alert-success">Thông tin của bạn đã được gửi thành công</div>');
				$(idForm + ' .form-control').val('');
			}
			
			$('body .page-loading').remove();
		}
	});
}

/**
 * Desciption: Hiển thị số lượng sản phẩm trong giỏ hàng
 */
function viewCart(){
	$.ajax({
		type: "POST",
		url: '/product/report',
		dataType: "json",
		cache: false,
		beforeSend: function() {
		},
		success: function(result){
			//var xhtml = '';
			//xhtml = '<a href="/post/product/cart" class="box_reportCart"><i class="fa fa-shopping-cart" aria-hidden="true"></i><span class="total">'+ result.total_product +'</span></a>';
			//$('body').append(xhtml);
			$('.box-cart .count').html(result.total_amount);
			//$('.box-cart .price').html(result.total_price);
		}
	});
}
viewCart();

/**
 * Desciption: Play video
 */
function playVideo(data) {
	$(data).html('<iframe width="560" height="315" src="https://www.youtube.com/embed/'+ $(data).attr('data-id') +'?rel=0&amp;showinfo=0&amp;autoplay=1" frameborder="0" allowfullscreen></iframe>')
}

/**
 * Desciption: Đếm số ký tự
 */
function countLeft(field, count, max) {
	if ($(field).val().length > max)
		$(field).val($(field).val().substring(0, max));
	else
		$(count + ' .value').html(max - $(field).val().length);
}

function openSearch(){
	$('.popup_search').remove();
}

function addCart(id) {
	var product_option_name = $('[name="product_option_name"]').val();
	var product_option_price = $('[name="product_option_price"]').val();
	if($('.product-options').html()) {
		if(!product_option_name) {
			alert('Vui lòng chọn kích thước');
			return false;
		}
	}
	var number = 1;
	if($('input[name="number"]').size() > 0) {
		number = parseInt($('input[name="number"]').val());
	}
	$.ajax({
		type: "POST",
		url: '/product/add-cart',
		data: {
			id: id,
			number: number,
			option: product_option_name,
			price: product_option_price
		},
		dataType: "json",
		cache: false,
		beforeSend: function() {
			$('body').append('<div class="page-loading"><div class="loader"></div></div>');
		},
		success: function(result){
			window.location = '/product/cart';
			viewCart();
			$('.page-loading').remove();
		}
	});
}

function myToggleClass(id, action) {
	$(id).toggleClass(action);
}

/**
 * Desciption: Nạp tất cả các function cần khởi tạo khi chạy ứng dụng
 */
$(document).ready(function() {
	var lazyLoadInstance = new LazyLoad({
		elements_selector: ".lazy",
		load_delay: 50,
		threshold: 0,
	});

	$('.layout_category_content .wrap_trigger').click(function() {
		$('.layout_category_content .wrap_mask').toggleClass('show');

		$(this).hide();
	});
});














