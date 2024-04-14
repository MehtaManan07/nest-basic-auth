#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

// Function to read the base model from base.prisma
function readBaseModel(directory) {
  const baseFile = path.join(directory, 'base.prisma');
  if (fs.existsSync(baseFile)) {
    const lines = fs
      .readFileSync(baseFile)
      .toString()
      .replace(/\r\n/g, '\n')
      .split('\n');
    const properties = lines.slice(2, -2);
    return properties;
  } else {
    return [];
  }
}

// Function to read all Prisma model files from a directory
function readModelFiles(directory) {
  const filesToExclude = ['base.prisma', 'models.prisma'];
  const baseProperties = readBaseModel(directory);
  const files = fs
    .readdirSync(directory)
    .filter(
      (file) => !filesToExclude.includes(file) && file.endsWith('.prisma'),
    )
    .map((file) => {
      // fs.readFileSync(path.join(directory, file), 'utf-8')
      const lines = fs
        .readFileSync(path.join(directory, file), 'utf-8')
        .toString()
        .replace(/\r\n/g, '\n')
        .split('\n');
      lines.splice(1, 0, ...baseProperties);
      return lines.join('\n');
    });

  return files;
}

// Function to combine base model and model files into a single schema file
function combineModels(directory) {
  const modelFiles = readModelFiles(directory);
  const combinedSchema = modelFiles.join('\n\n');

  // Write the combined schema to schema.prisma file
  fs.writeFileSync(path.join(directory, 'models.prisma'), combinedSchema);
  console.log('Combined schema.prisma file has been created successfully.');
}

// Main function
function main() {
  const directory = process.argv[2];
  if (!directory) {
    console.error('Usage: combine-prisma-models <directory>');
    process.exit(1);
  }

  combineModels(directory);
}

// Execute the main function
main();
