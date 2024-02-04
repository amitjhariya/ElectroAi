import fetch from 'node-fetch'
import fs  from 'fs';

function downloadFile(file_url, targetPath) {
    // Save variable to know progress
    let received_bytes = 0;
    let total_bytes = 0;

    const req = fetch(file_url);

    const out = fs.createWriteStream(targetPath);

    req.then((response) => {
        // Change the total bytes value to get progress later.
        total_bytes = parseInt(response.headers.get('content-length'));

        response.body.pipe(out);

        response.body.on('data', function (chunk) {
            // Update the received bytes
            received_bytes += chunk.length;

            showProgress(received_bytes, total_bytes);
        });

        response.body.on('end', function () {
            console.log("File successfully downloaded");
        });
    }).catch((err) => {
        console.error("Error downloading the file:", err);
    });
}

function showProgress(received, total) {
    const percentage = (received * 100) / total;
    console.log(percentage.toFixed(2) + "% | " + received + " bytes out of " + total + " bytes.");
}

downloadFile("https://huggingface.co/TheBloke/openchat-3.5-0106-GGUF/resolve/main/openchat-3.5-0106.Q4_0.gguf?download=true", "./test.gguf");
