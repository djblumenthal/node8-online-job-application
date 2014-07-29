$(function(){
	$('.delete').on('click', function(e){

		var applicantRow = $(this).parent('li');
		$.post('/deleteApplicant', {e.target.id}, function(data))


	})
});