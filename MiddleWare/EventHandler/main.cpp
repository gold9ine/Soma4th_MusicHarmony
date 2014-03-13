#include <QCoreApplication>
#include <QTimer>

#include <MainLogic.h>

int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    MainLogic mainLogic;
    QTimer::singleShot(0, &mainLogic, SLOT(execute()));

    return a.exec();
}
