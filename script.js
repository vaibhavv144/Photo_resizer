const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let img = new Image();

document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        img.src = e.target.result;
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            document.getElementById('downloadBtn').disabled = false;
        }
    }
    reader.readAsDataURL(file);
});

function resizeImage(type) {
    let targetWidth, targetHeight;
    
    if (type === 'instagram') {
        targetWidth = 1080;
        targetHeight = 1080;
    } else if (type === 'twitter') {
        targetWidth = 1200;
        targetHeight = 675;
    } else if (type === 'custom') {
        targetWidth = document.getElementById('width').value;
        targetHeight = document.getElementById('height').value;
    }

    if (targetWidth && targetHeight) {
        const originalAspectRatio = img.width / img.height;
        const targetAspectRatio = targetWidth / targetHeight;

        if (originalAspectRatio > targetAspectRatio) {
            // Adjust height to maintain aspect ratio
            targetHeight = targetWidth / originalAspectRatio;
        } else {
            // Adjust width to maintain aspect ratio
            targetWidth = targetHeight * originalAspectRatio;
        }
        
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        document.getElementById('downloadBtn').disabled = false;
    } else {
        alert("Please enter valid dimensions.");
    }
}

function downloadImage() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'resized_image.png';
    link.click();
    document.createElement('');
}
