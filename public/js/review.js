document.getElementById('addReviewButton').addEventListener('click', function() {
    // Toggle the visibility of the review form
    var reviewForm = document.getElementById('reviewForm');
    if (reviewForm.style.display === 'none') {
        reviewForm.style.display = 'block';
    } else {
        reviewForm.style.display = 'none';
    }
});