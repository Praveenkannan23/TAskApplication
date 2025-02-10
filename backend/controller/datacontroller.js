import Usertask from "../modal/userdata.js";

const generaterecordId = () => {
  return Math.floor(Math.random() * 9000000) + 1000000;
};

export const userTask = async (req, res) => {
  try {
    const { usertaskdata } = req.body;

    const data = new Usertask({
      recordId: generaterecordId(),
      usertaskdata,
    });

    await data.save();
    res
      .status(200)
      .json({
        data: req.body,
        message: "Data saved successfully",
        success: true,
        recordId: data.recordId,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getalltask = async (req, res) => {
  try{
    const gettaskdata = await Usertask.find();

    if(!gettaskdata || gettaskdata.length === 0){
      return res.status(400).json({message:"No data found"})
    }
    return res.status(200).json({gettaskdata})
  }catch(error){
    console.log(error);
    res.status(500).json({message:"Internal server error"})
  }
}

export const deletetask = async (req, res) => {
  try{
    const { recordId } = req.body;
    await Usertask.deleteOne({ recordId });
    res.status(200).json({ message: "Data deleted successfully" });
  }catch(error){
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}