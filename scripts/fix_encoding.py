import json
import re

def fix_mojibake(text: str) -> str:
    # Common UTF-8 misinterpretations (Windows-1252 or Latin-1)
    replacements = [
        # Quotes and apostrophes
        ('â€™', "'"),
        ('â€˜', "'"),
        ('â€œ', '"'),
        ('â€', '"'),
        ('â€"', '—'),
        ('â€“', '–'),
        ('â€¦', '…'),
        
        # Soccer ball & trophies & checkmarks
        ('âš½', '⚽'),
        ('ðŸ†', '🏆'),
        ('âœ…', '✅'),
        ('âš', '⚽'),
        
        # Dots & bullets
        ('Â·', '·'),
        ('Â¢', '·'),
        ('â€¢', '•'),
        
        # Ghanaian Twi characters: Ɔ and ɔ in "#AgyaNaƆwɔTumi"
        ('Æ†', 'Ɔ'),
        ('É”', 'ɔ'),
        ('Ã†', 'Ɔ'),
        ('Ã‰', 'ɔ'),
        ('AgyaNaÆ†wÉ”Tumi', 'AgyaNaƆwɔTumi'),
        ('AgyaNaÃ†wÃ‰Tumi', 'AgyaNaƆwɔTumi'),
        ('AGYA NA Æ†WÉ” TUMI', 'AGYA NA ƆWƆ TUMI'),
        ('AGYA NA Ã†WÃ‰ TUMI', 'AGYA NA ƆWƆ TUMI'),
        
        # Win Â¢ FT or Win Â· FT
        ('WIN Â¢ FT', 'WIN · FT'),
        ('WIN Â· FT', 'WIN · FT'),
        ('DRAW Â¢ FT', 'DRAW · FT'),
        ('DRAW Â· FT', 'DRAW · FT'),
        ('LOSS Â¢ FT', 'LOSS · FT'),
        ('LOSS Â· FT', 'LOSS · FT'),
        
        # Stray stray Â
        ('Â ', ' '),
        ('Â', ''),
    ]
    
    for old, new in replacements:
        text = text.replace(old, new)
        
    return text

def clean_file(path: str):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        fixed = fix_mojibake(content)
        if fixed != content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(fixed)
            print(f"Fixed encoding in: {path}")
        else:
            print(f"No encoding issues in: {path}")
    except Exception as e:
        print(f"Error cleaning {path}: {e}")

if __name__ == '__main__':
    files = [
        'data/cms.json',
        'public/data/cms.json',
        'js/main.js',
        'public/js/main.js',
        'index.html',
        'public/index.html',
        'admin.html',
        'public/admin.html',
    ]
    for fp in files:
        clean_file(fp)
