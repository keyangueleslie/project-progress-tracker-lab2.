const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

// Sample milestone records for this lab.
const milestones = [
  { milestoneName: 'Project Planning', status: 'Completed' },
  { milestoneName: 'Design User Interface', status: 'In Progress' },
  { milestoneName: 'Test Application', status: 'Not Started' }
];

// Retrieve the three predefined milestones.
app.get('/milestones', (req, res) => {
  res.json(milestones);
});

// Receive a milestone and acknowledge it without saving it.
app.post('/milestones', (req, res) => {
  const { milestoneName, status } = req.body;

  if (
    typeof milestoneName !== 'string' ||
    typeof status !== 'string' ||
    !milestoneName.trim() ||
    !status.trim()
  ) {
    return res.status(400).json({
      message: 'Milestone name and status are required.'
    });
  }

  console.log('Milestone Name:', milestoneName);
  console.log('Status:', status);

  res.status(200).json({
    message: 'Milestone submitted successfully!',
    milestone: { milestoneName, status }
  });
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
