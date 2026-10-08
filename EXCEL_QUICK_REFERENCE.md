# Excel File Quick Reference Card

## ✅ Valid Excel Format

```
Column A      | Column B
--------------|----------
Product A     | 150
Product B     | 200
Product C     | 175
Product D     | 225
Product E     | 190
```

## 📋 Requirements Checklist

- [ ] File format: `.xlsx` or `.xls`
- [ ] File size: Under 10MB
- [ ] At least 2 columns (A and B)
- [ ] Column A: Text labels
- [ ] Column B: Numeric values only
- [ ] No empty rows between data
- [ ] No merged cells
- [ ] Data starts from row 1

## 🚫 Common Mistakes

### ❌ Wrong: Single Column
```
Product A
Product B
Product C
```

### ❌ Wrong: Text in Values Column
```
Product A | High
Product B | Medium
Product C | Low
```

### ❌ Wrong: Empty Rows
```
Product A | 100
          |
Product B | 200
```

### ✅ Correct Format
```
Product A | 100
Product B | 200
Product C | 150
```

## 🎯 Quick Tips

1. **Keep it simple**: 2 columns, clean data
2. **Use numbers**: Column B must be numeric
3. **No gaps**: Remove empty rows
4. **Test first**: Try with 3 rows before uploading large files
5. **Check format**: Save as .xlsx or .xls

## 🔧 If Chart Doesn't Show

1. Check error message in toast notification
2. Verify Column B has only numbers
3. Remove any empty rows
4. Ensure file is .xlsx or .xls format
5. See EXCEL_FILE_FORMAT.md for detailed help

## 📊 What You'll Get

- Interactive bar chart
- Up to 10 data points displayed
- Hover to see exact values
- Automatic updates in Analytics tab

---

**Need more help?** See `EXCEL_FILE_FORMAT.md` for comprehensive guide.
