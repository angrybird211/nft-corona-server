/**
 * Category model
 * 
 * @since 1.0.0
 * @version 1.0.0
 * @package main/Models/Category
 */

import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: String
});

const Category = mongoose.model('Category', categorySchema);

export { Category };

