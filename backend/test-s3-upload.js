import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new AWS.S3();

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'privateme-notes';
const TEST_USER_ID = 'test-user-123';
const TEST_NOTE_ID = 'test-note-001';

async function testS3Upload() {
  console.log('🧪 Testing S3 Upload with IAM Credentials...\n');
  
  const testData = {
    title: 'Test Note',
    content: 'This is a test encrypted note',
    timestamp: new Date().toISOString()
  };
  
  const encryptedData = Buffer.from(JSON.stringify(testData)).toString('base64');
  
  const key = `users/${TEST_USER_ID}/notes/${TEST_NOTE_ID}.enc`;
  
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: Buffer.from(encryptedData, 'base64'),
    ContentType: 'application/octet-stream',
    ServerSideEncryption: 'AES256',
    Metadata: {
      userId: TEST_USER_ID,
      noteId: TEST_NOTE_ID,
      uploadedAt: new Date().toISOString()
    }
  };

  try {
    console.log(`📦 Bucket: ${BUCKET_NAME}`);
    console.log(`🔑 Key: ${key}`);
    console.log(`📊 Data size: ${Buffer.from(encryptedData, 'base64').length} bytes`);
    console.log(`\n⬆️  Uploading to S3...`);
    
    const result = await s3.putObject(params).promise();
    
    console.log('\n✅ Upload successful!');
    console.log(`   ETag: ${result.ETag}`);
    if (result.VersionId) {
      console.log(`   Version ID: ${result.VersionId}`);
    }
    
    console.log('\n📥 Testing retrieval...');
    const getParams = {
      Bucket: BUCKET_NAME,
      Key: key
    };
    
    const retrieved = await s3.getObject(getParams).promise();
    const retrievedData = retrieved.Body.toString('base64');
    
    console.log('✅ Retrieval successful!');
    console.log(`   Size: ${retrieved.ContentLength} bytes`);
    console.log(`   Encryption: ${retrieved.ServerSideEncryption}`);
    console.log(`   Last Modified: ${retrieved.LastModified}`);
    
    if (retrievedData === encryptedData) {
      console.log('\n🎉 Data integrity verified! Upload and retrieval working correctly.');
    } else {
      console.log('\n⚠️  Warning: Retrieved data does not match uploaded data');
    }
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ IAM Setup Test: PASSED');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\nYour IAM credentials have proper S3 permissions for:`);
    console.log(`  ✓ s3:PutObject`);
    console.log(`  ✓ s3:GetObject`);
    console.log(`\nBucket: ${BUCKET_NAME}`);
    console.log(`Test file location: ${key}`);
    
  } catch (error) {
    console.error('\n❌ Upload failed!');
    console.error(`Error: ${error.message}`);
    console.error(`Code: ${error.code}`);
    
    if (error.code === 'NoSuchBucket') {
      console.error(`\n💡 Solution: Create the S3 bucket first:`);
      console.error(`   aws s3 mb s3://${BUCKET_NAME} --region us-east-1`);
    } else if (error.code === 'AccessDenied' || error.code === 'Forbidden') {
      console.error(`\n💡 Solution: Check your IAM permissions. You need:`);
      console.error(`   - s3:PutObject on arn:aws:s3:::${BUCKET_NAME}/*`);
      console.error(`   - s3:GetObject on arn:aws:s3:::${BUCKET_NAME}/*`);
    } else if (error.code === 'CredentialsError') {
      console.error(`\n💡 Solution: Configure AWS credentials:`);
      console.error(`   aws configure`);
    }
    
    console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('❌ IAM Setup Test: FAILED');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    process.exit(1);
  }
}

testS3Upload();
