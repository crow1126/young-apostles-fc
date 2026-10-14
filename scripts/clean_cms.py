import json

with open('data/cms.json', 'r', encoding='utf-8') as f:
    cms = json.load(f)

def clean_val(val):
    if isinstance(val, str):
        # 1. Twi motto: normalize to safe HTML entities so cp1252/latin1 never mangles them
        val = val.replace('AgyaNaƆwÉ&rdquo;Tumi', 'AgyaNa&#390;w&#596;Tumi')
        val = val.replace('AgyaNaÆ†wÉ”Tumi', 'AgyaNa&#390;w&#596;Tumi')
        val = val.replace('AgyaNaÃ†wÃ‰Tumi', 'AgyaNa&#390;w&#596;Tumi')
        val = val.replace('AgyaNaƆwɔTumi', 'AgyaNa&#390;w&#596;Tumi')
        val = val.replace('AGYA NA ƆWƆ TUMI', 'AGYA NA &#390;W&#596; TUMI')
        val = val.replace('AGYA NA Æ†WÉ” TUMI', 'AGYA NA &#390;W&#596; TUMI')
        val = val.replace('AGYA NA Ã†WÃ‰ TUMI', 'AGYA NA &#390;W&#596; TUMI')
        
        # 2. Quotes & apostrophes: clean to standard ASCII ' and HTML entities
        val = val.replace('â€™', "'").replace('â€˜', "'").replace('’', "'").replace('‘', "'")
        val = val.replace('â€œ', '&ldquo;').replace('â€ ', '&rdquo;').replace('“', '&ldquo;').replace('”', '&rdquo;')
        val = val.replace('â€”', '&mdash;').replace('â€“', '&ndash;')
        
        # 3. Bullets and icons
        val = val.replace('âš½', '&#9917;').replace('⚽', '&#9917;')
        val = val.replace('Â·', '&bull;').replace('Â¢', '&bull;').replace('•', '&bull;')
        val = val.replace('ðŸ †', '&#127942;').replace('🏆', '&#127942;')
        val = val.replace('âœ…', '&#9989;').replace('✅', '&#9989;')
        val = val.replace('Â', '')
        return val
    elif isinstance(val, list):
        return [clean_val(x) for x in val]
    elif isinstance(val, dict):
        return {k: clean_val(v) for k, v in val.items()}
    return val

cleaned = clean_val(cms)

with open('data/cms.json', 'w', encoding='utf-8') as f:
    json.dump(cleaned, f, indent=2, ensure_ascii=False)

with open('public/data/cms.json', 'w', encoding='utf-8') as f:
    json.dump(cleaned, f, indent=2, ensure_ascii=False)

print('Cleaned cms.json successfully!')
