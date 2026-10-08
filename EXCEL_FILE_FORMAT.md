# Excel File Format Guide for Chart Visualization

## Overview
This guide explains the correct Excel file format required for automatic chart generation in the Owner-Worker Platform.

## Required Format

### Basic Structure
Your Excel file must have **at least 2 columns** with data:
- **Column 1 (A)**: Labels/Names (Text)
- **Column 2 (B)**: Values (Numbers)

### Example 1: Sales Data
```
| Product    | Sales |
|------------|-------|
| Product A  | 150   |
| Product B  | 200   |
| Product C  | 175   |
| Product D  | 225   |
| Product E  | 190   |
```

### Example 2: Monthly Revenue
```
| Month     | Revenue |
|-----------|---------|
| January   | 45000   |
| February  | 52000   |
| March     | 48000   |
| April     | 55000   |
| May       | 60000   |
```

### Example 3: Employee Performance
```
| Employee  | Score |
|-----------|-------|
| John      | 85    |
| Sarah     | 92    |
| Mike      | 78    |
| Lisa      | 88    |
| Tom       | 95    |
```

## Important Rules

### ✅ DO:
1. **Use 2 columns minimum**
   - First column: Text labels
   - Second column: Numeric values

2. **Keep data clean**
   - Remove empty rows between data
   - Ensure numeric values are actual numbers (not text)
   - Use consistent formatting

3. **Headers are optional**
   - You can include headers in the first row
   - The system will automatically detect and use your data

4. **Limit data rows**
   - System displays up to 10 data points
   - If you have more, only the first 10 will be shown

### ❌ DON'T:
1. **Don't use single column**
   - ❌ Only one column of data
   - ✅ At least two columns required

2. **Don't mix data types in value column**
   - ❌ Column 2: "100", "High", "200", "Low"
   - ✅ Column 2: 100, 150, 200, 250

3. **Don't leave empty cells in data range**
   - ❌ Product A | 100 | | Product B | 200
   - ✅ Product A | 100 | Product B | 200

4. **Don't use merged cells**
   - ❌ Merged cells in data area
   - ✅ Regular cells only

## File Format Support

### Supported Formats:
- ✅ `.xlsx` (Excel 2007 and later)
- ✅ `.xls` (Excel 97-2003)

### File Size Limit:
- Maximum: **10 MB**

## Step-by-Step Guide

### Creating a Valid Excel File

#### Step 1: Open Excel
- Open Microsoft Excel, Google Sheets, or LibreOffice Calc

#### Step 2: Enter Data
1. In cell A1, enter your first label (e.g., "Product A")
2. In cell B1, enter your first value (e.g., 150)
3. Continue entering data in rows below

#### Step 3: Format Values
1. Select column B (values column)
2. Format as "Number" (not "Text")
3. Remove any currency symbols or special characters

#### Step 4: Clean Up
1. Remove any empty rows between data
2. Delete any extra columns beyond column B
3. Ensure no merged cells in data area

#### Step 5: Save
1. Save as `.xlsx` or `.xls` format
2. Keep file size under 10 MB
3. Use a descriptive filename

## Testing Your File

### Before Uploading:
1. ✅ Check column A has text labels
2. ✅ Check column B has numeric values only
3. ✅ Verify no empty rows in data
4. ✅ Confirm file format is .xlsx or .xls
5. ✅ Ensure file size is under 10 MB

### After Uploading:
1. Go to Owner Dashboard → Files tab
2. Find your uploaded file
3. Click "View Chart" button
4. Check Analytics tab for the chart
5. If error appears, review the error message and fix accordingly

## Common Issues & Solutions

### Issue 1: "Excel file is empty"
**Cause**: File has no data or data is in wrong format
**Solution**: 
- Ensure data starts from row 1
- Check that cells actually contain data
- Save file again and re-upload

### Issue 2: "Excel file must have at least 2 columns with data"
**Cause**: Only one column has data
**Solution**:
- Add a second column with numeric values
- Ensure both columns have data in the same rows

### Issue 3: "No valid data found in Excel file"
**Cause**: Second column doesn't contain valid numbers
**Solution**:
- Check column B is formatted as "Number"
- Remove any text from column B
- Ensure values are actual numbers (not formulas that return errors)

### Issue 4: Chart shows but with wrong data
**Cause**: Data format is incorrect or has extra characters
**Solution**:
- Clean up column A (remove special characters)
- Ensure column B has only numeric values
- Remove any formatting or formulas

### Issue 5: "Failed to parse Excel file"
**Cause**: File is corrupted or in unsupported format
**Solution**:
- Save file as .xlsx format
- Try opening and re-saving the file
- Create a new file and copy data over

## Sample Files

### Minimal Valid File:
```
A         | B
----------|----
Item 1    | 10
Item 2    | 20
Item 3    | 30
```

### With Headers:
```
A         | B
----------|--------
Name      | Value
Item 1    | 10
Item 2    | 20
Item 3    | 30
```

### Maximum Data Points (10 rows):
```
A         | B
----------|----
Item 1    | 10
Item 2    | 20
Item 3    | 30
Item 4    | 40
Item 5    | 50
Item 6    | 60
Item 7    | 70
Item 8    | 80
Item 9    | 90
Item 10   | 100
```

## Chart Visualization

### What You'll See:
- **Bar Chart**: Vertical bars representing your data
- **X-Axis**: Labels from column A
- **Y-Axis**: Values from column B
- **Hover**: Hover over bars to see exact values
- **Legend**: Shows "value" as the data series name

### Chart Features:
- ✅ Interactive hover tooltips
- ✅ Grid lines for easy reading
- ✅ Automatic scaling based on your data
- ✅ Professional color scheme
- ✅ Responsive design (works on all screen sizes)

## Best Practices

### For Better Visualization:
1. **Use short, clear labels**
   - ✅ "Jan", "Feb", "Mar"
   - ❌ "January Sales Data for Region A"

2. **Keep values in similar range**
   - ✅ 100, 150, 200, 250
   - ⚠️ 10, 5000, 50, 10000 (hard to visualize)

3. **Sort data logically**
   - By date (chronological)
   - By value (ascending/descending)
   - By category (alphabetical)

4. **Use consistent units**
   - All values in same unit (dollars, units, percentage)
   - Don't mix units in same dataset

5. **Limit data points**
   - 5-10 data points work best for bar charts
   - Too many bars make chart hard to read

## Need Help?

If you're still having issues:
1. Check the error message carefully
2. Review this guide again
3. Try with a simple 2-column, 3-row file first
4. Verify file format is .xlsx or .xls
5. Check browser console for detailed error messages

## Quick Checklist

Before uploading, verify:
- [ ] File format is .xlsx or .xls
- [ ] File size is under 10 MB
- [ ] Column A has text labels
- [ ] Column B has numeric values
- [ ] No empty rows in data
- [ ] No merged cells
- [ ] Data starts from row 1
- [ ] At least 2 rows of data

---

**Remember**: The system automatically handles headers and formats your data for optimal visualization. Just ensure your Excel file follows the basic 2-column structure!
