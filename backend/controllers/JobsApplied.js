const JobsApplied = require('../models/JobsApplied');

// Function to handle the retrieval of jobs applied by a user based on their email

module.exports.getJobsApplied = async (req, res) => {
  try {
    const { email } = req.params;
    const jobsApplied = await JobsApplied.findOne({ email });

    if (jobsApplied) {
      return res.json({ msg: "success", jobsApplied: jobsApplied.jobsApplied });
    } else {
      return res.json({ msg: "User with given email not found." });
    }
  } catch (error) {
    console.error('Error fetching jobsApplied:', error);
    return res.json({ msg: "Error fetching jobsApplied." });
  }
};

// Function to handle adding a job to the list of jobs applied by a user

module.exports.addToJobsApplied = async (req, res) => {
  try {
    const { email, data } = req.body;
    let jobsApplied = await JobsApplied.findOne({ email });

    // Log the Bookmark ID and Data
    console.log('JobsApplied ID:', jobsApplied ? jobsApplied._id : 'Not found');
    console.log('Data:', data);

    if (jobsApplied) {
      // Initialize jobsApplied if it doesn't exist
      if (!Array.isArray(jobsApplied.jobsApplied)) {
        jobsApplied.jobsApplied = [];
      }

      const alreadyJobApplied = jobsApplied.jobsApplied.find(
        ({ _id }) => _id && _id.toString() === data._id
      );

      if (!alreadyJobApplied) {
        await JobsApplied.updateOne(
          { email },
          { $push: { jobsApplied: data } }
        );
        jobsApplied = await JobsApplied.findOne({ email });
      } else {
        return res.json({ msg: 'Already added to the jobsApplied list.' });
      }
    } else {
      jobsApplied = await JobsApplied.create({ email, jobsApplied: [data] });
    }

    // Log the updated Bookmark ID and Data
    console.log('Updated JobsApplied ID:', jobsApplied ? jobsApplied._id : 'Not found');
    console.log('Updated Data:', jobsApplied ? jobsApplied.jobsApplied : 'Not found');

    return res.json({
      msg: 'Successfully added to jobsApplied list.',
      jobsApplied: jobsApplied.jobsApplied,
    });
  } catch (error) {
    console.error('Error adding to jobsApplied:', error);
    return res.json({
      msg: 'Error adding to the jobsApplied list',
    });
  }
};