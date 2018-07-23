import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    genus: { type: String, default: "felis" },
    name: { type: String, default: "" },
    isHungry:  { type: Boolean, default: true },
    lastFedDate: {type: Date, default: Date.now()}
});

export default mongoose.model('Cat', Schema);
