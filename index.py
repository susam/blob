import datetime
import fnmatch
import os
import sys


ignore_list = [
    '.*',
    'index.html',
]


def fread(filename):
    """Read file and close the file."""
    with open(filename, 'r') as f:
        return f.read()


def fwrite(filename, text):
    """Write content to file and close the file."""
    with open(filename, 'w') as f:
        f.write(text)


def log(msg, *args):
    """Log message with specified arguments."""
    sys.stderr.write(msg.format(*args) + '\n')


def ignored(filename):
    for pattern in ignore_list:
        if fnmatch.fnmatch(filename, pattern):
            return True
    return False


def human_bytes(size):
    kilo = 1024
    suffixes = ('B', 'K')
    n = 0
    while n < len(suffixes) - 1 and size > kilo:
        size /= kilo
        n += 1
    return '{:.0f} {}'.format(size, suffixes[n])


def walk(path):
    html = []
    total_size = 0
    dir_link_suffix = '/index.html'

    if path == '.':
        display_path = "Susam's Blob Tree"
    else:
        display_path = '/blob' + path[1:] + '/'
        html.append('  <tr>')
        html.append('    <td class="file"><a href="..{}">../</a></td>'
                         .format(dir_link_suffix))
        html.append('    <td class="size">-</td>')
        html.append('  </tr>')

    for child_name in sorted(os.listdir(path)):
        if ignored(child_name):
            continue
        child_path = os.path.join(path, child_name)
        if os.path.isdir(child_path):
            child_link = os.path.join(child_name + dir_link_suffix)
            child_name = child_name + '/'
            size = walk(child_path)
        else:
            child_link = child_name
            size = os.lstat(child_path).st_size

        total_size += size

        html.append('  <tr>')
        html.append('    <td class="file"><a href="{}">{}</a></td>'
                    .format(child_link, child_name))
        html.append('    <td class="size">{}</td>'
                    .format(human_bytes(size)))
        html.append('  </tr>')
    html = '\n'.join(html)

    out = html_template
    out = (out.replace('{{ path }}', display_path)
              .replace('{{ table }}', html)
              .replace('{{ year }}', str(datetime.datetime.now().year)))

    dst_path = os.path.join(path, 'index.html')
    log('Writing {} ...', dst_path)
    fwrite(dst_path, out)

    return total_size


def main():
    walk('.')


html_template = """
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Index of {{ path }}</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { margin: 0; line-height: 1.5; color: #333;
           font-family: monospace, monospace }
    h1 { margin-bottom: 0.25em }
    main, hr, footer { max-width: 40em; padding: 0 1em; margin: 0 auto}
    a { color: #03c }
    a:link, a:visited { text-decoration: none }
    a:hover, a:active { text-decoration: underline; opacity: 0.8 }
    .size { text-align: right }
    footer { margin-top: 1em }
  </style>
</head>
<body>
<main>
<h1>Index of {{ path }}</h1>
<table width="100%">
<tr><td colspan="2"><hr></td></tr>
{{ table }}
<tr><td colspan="2"><hr></td></tr>
</table>
</main>
<footer>
&copy; 2018-{{ year }} Susam Pal
</footer>
</body>
</html>
"""


if __name__ == '__main__':
    main()
