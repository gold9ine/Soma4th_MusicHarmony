#ifndef MAINLOGIC_H
#define MAINLOGIC_H

#include <QtCore>
#include <iostream>

#include "ServerThreaded.h"
#include "UdpServer.h"

class MainLogic : public QObject
{
    Q_OBJECT

public:
    MainLogic();
    ~MainLogic();

    ServerThreaded webSocketServer;
    UdpServer ipsServer;

public slots:
    void execute();

};

#endif // MAINLOGIC_H
