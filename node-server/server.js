require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const connect_string = process.env.MONGODB_URI;

// MongoDB Atlas 연결 설정
// mongoose.connect(connect_string, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect(connect_string);

// 데이터 모델 정의 (Mongoose 스키마)
const pageTimeSchema = new mongoose.Schema({
  pageName: String,
  timeSpent: String,
});
const PageTime = mongoose.model('PageTime', pageTimeSchema);

const componentUsageSchema = new mongoose.Schema({
    componentName: String,
    count: Number,
  });
  const ComponentUsage = mongoose.model('ComponentUsage', componentUsageSchema);

// API 엔드포인트
app.post('/api/page-remain-time', async (req, res) => {
  try {
    const { pageName, timeSpent } = req.body;
    const newTimeEntry = new PageTime({ pageName, timeSpent });
    await newTimeEntry.save();
    res.status(200).json(newTimeEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/component-used', async (req, res) => {
    try {
      const { componentName, count } = req.body;
      
      // 이미 기록된 컴포넌트가 있는지 확인하고, 있다면 카운트를 업데이트
      const existingComponent = await ComponentUsage.findOne({ componentName: componentName });
      if (existingComponent) {
        existingComponent.count += count;
        await existingComponent.save();
      } else {
        // 새로운 컴포넌트 사용 기록 생성
        const newComponentUsage = new ComponentUsage({ componentName, count });
        await newComponentUsage.save();
      }
      
      res.status(200).json({ message: 'Component usage recorded successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
