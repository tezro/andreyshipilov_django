#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-

from os.path import join, abspath, dirname
import sys
from urllib2 import urlopen

sys.path.insert(0, abspath(join(dirname(__file__), 'andreyshipilov')))

import settings
from django.core.management import setup_environ
from django.core.mail import send_mail
setup_environ(settings)



# Is verbose output needed?
IS_VERBOSE = True if '-v' in sys.argv else False

# Get projects from models.
from me.models import Project
projects = Project.get_published().filter(link__startswith="http://")\
                  .values('link', 'slug')

# List of bad hosts.
pinged_bad = []

for i in projects:
    try:
        # Trying to get any response.
        response = urlopen(i['link'])

        if IS_VERBOSE:
            print "+ '%s' is OK" % (i['slug'],)
    except:
        pinged_bad.append("%s: %s" % (i['slug'], i['link']))
        if IS_VERBOSE:
            print "- '%s' is not pinged" % (i['slug'],)

if pinged_bad:
    message = '\n'.join(pinged_bad)
    send_mail("Some sites are dead", message, 
              'error@andreyshipilov.com', ['tezro.gb@gmail.com'])