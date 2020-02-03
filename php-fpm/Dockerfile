FROM php:7.3-fpm

RUN apt-get update -y
RUN apt-get -y install sudo wget gcc make autoconf libc-dev pkg-config libzip-dev \
  	git \
  	build-essential \
  	#default-mysql-client
        mariadb-client \
        libpng-dev \
        libjpeg62-turbo-dev \
        libfreetype6-dev \
        locales \
        zip \
        jpegoptim optipng pngquant gifsicle \
        nano \
        unzip \
        curl

RUN pecl install xdebug && docker-php-ext-enable xdebug

# Install extensions
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
RUN docker-php-ext-configure gd --with-gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/
RUN docker-php-ext-install gd

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lis

RUN addgroup -gid 1000 node

RUN useradd -u 1000 asyou -G node,sudo -s /bin/sh -N -m

RUN echo "asyou:123" | chpasswd

USER asyou

COPY php.ini /usr/local/etc/php/
COPY xdebug.ini /usr/local/etc/php/conf.d