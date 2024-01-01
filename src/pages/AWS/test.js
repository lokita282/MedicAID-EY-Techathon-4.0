import AWS from "aws-sdk";
import { TranscribeClient, StartMedicalScribeJobCommand } from "@aws-sdk/client-transcribe";
import { useState } from "react";
import SideDrawer from "../../components/sidebar/Sidebar";

function Test() {
    const [file, setFile] = useState(null);
    const [URI, setURI] = useState();


    const uploadFile = async () => {

        const client = new TranscribeClient({
            region: "us-east-1",
            credentials: {
                accessKeyId: "AKIAX6WVQZEVBR3IKP76",
                secretAccessKey: "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",
            }
        });
        const run = async () => {
            try {
                const data = await client.send(
                    new StartMedicalScribeJobCommand(input)
                );
                console.log("Success - put", data);
                return data; // For unit tests.
            } catch (err) {
                console.log("Error", err);
            }
        };
        let input = {
            "MedicalScribeJobName": "medicaid",
            "LanguageCode": "en-US",
            "Media": {
                "MediaFileUri": URI
            },
            "Settings": {
                "ShowSpeakerLabels": true,
                "MaxSpeakerLabels": 2,
                "ChannelIdentification": false
            },
            "DataAccessRoleArn": "arn:aws:iam::546982381866:role/medicaid-role",
            "OutputBucketName": "medicaid1"
        }

        const S3_BUCKET = "medicaid1";
        const REGION = "us-east-1";

        AWS.config.update({
            accessKeyId: "AKIAX6WVQZEVBR3IKP76",
            secretAccessKey: "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",
        });
        const s3 = new AWS.S3({
            params: { Bucket: S3_BUCKET },
            region: REGION,
        });

        const params = {
            Bucket: S3_BUCKET,
            Key: file.name,
            Body: file,
        };

        var upload = s3
            .putObject(params)
            .on("httpUploadProgress", (evt) => {
                console.log(
                    "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
                );
            })
            .promise();

        await upload.then((err, data) => {
            // console.log(params.Key);
            setURI(`s3://medicaid1/${params.Key}`)
            run();

        });
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };
    return (
        <SideDrawer>
            {URI ? URI : "no"}
            <div className="App">
                <div>
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={uploadFile}>Upload</button>
                </div>
            </div>
        </SideDrawer>
    );
}

export default Test