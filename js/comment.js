---

$(function() {
	var $commentForm = $('#comment-form');
    var $commentFormSubmissionResult = $('#comment-form-submission-result');
	$commentForm.on('submit', function(e) {
		var msgLoad = '<div class="alert alert-dismissible alert-info"><button type="button" class="close" data-dismiss="alert">&times;</button><h4 class="alert-heading">Submitting comment…</h4>Please wait a second...</div>';
		var msgSuccess = '<div class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button><h4 class="alert-heading">Comment sumbitted!</h4>Your comment is waiting for approval and will be visible shortly.</div>';
		var msgError = '<div class="alert alert-dismissible alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button><h4 class="alert-heading">Comment NOT submitted!</h4>Something went wrong. Please make sure all required fields have been completed and try again. alternatively contact us via <a class="alert-link" href="{{ "/#contact" | prepend: site.baseurl }}">the contact form</a>.</div>';

		e.preventDefault();
		$.ajax({
            type: $(this).attr("method"),
            url: $(this).attr("action"),
			data: $(this).serialize(),
			dataType: 'json',
			beforeSend: function() {
                $commentForm.find('input, textarea, button, select').attr('disabled','disabled');
                $commentFormSubmissionResult.html(msgLoad);
			}
		}).done(function(data) {
			$commentFormSubmissionResult.html(msgSuccess);
            $commentForm.find('input, textarea, button, select').removeAttr('disabled');
		}).fail(function() {
			$commentFormSubmissionResult.html(msgError);
            $commentForm.find('input, textarea, button, select').removeAttr('disabled');
		});
        return false;
	});
});
