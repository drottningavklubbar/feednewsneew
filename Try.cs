using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace LotteryRandomNumberGenerator
{
    class Try
    {
       // private static RNGCryptoServiceProvider rngCsp = new RNGCryptoServiceProvider();
        
        

        public static void Main()
        {
            //we are supposing that we have 5 prizes per month
            const int totalDrawings = 5;
            // we assume that we have 1000 tickets or more 
            long[] resultsDraws = new long[1000];
            int draw = 1;
            int checks = 0;
            string pathWinners = "C:\\Users\\oana.cazan\\Desktop\\Winners\\winners.txt";
            string pathNewWinners = "C:\\Users\\oana.cazan\\Desktop\\Winners\\newwinners.txt";


           // long coutingTheLinesFromTheWinners = CountTheLineFromTheWinners(pathWinners);
            //Console.WriteLine(coutingTheLinesFromTheWinners);
            
            List<long> oldWinners = ReadTheWinners(pathWinners);

            List<long> winnersList=new List<long>();


            for (var i = 0; i < oldWinners.Count; i++)
            {
                Console.WriteLine("The old winners within the news one are: {0}", oldWinners[i]);
            }

            while (draw <= totalDrawings)
            {
                //&& checks == 0)
                Console.WriteLine("We are here");
                long drawing = DrawTicket((long)resultsDraws.Length);
                Console.WriteLine("The new winner is: {0}", drawing);
                resultsDraws[drawing]++;



                while (VerifyIfTheWinnerExists(resultsDraws.Length, drawing, oldWinners) == true)
                {
                    //   daca e adevarat inseamna ca s a gasit un numar la fel extras deja
                    //  sa se refaca extragerea
                    Console.WriteLine("Suntem aici!");
                    drawing = DrawTicket((long)resultsDraws.Length);
                    Console.WriteLine("The element in here {0}",drawing);
                    resultsDraws[drawing]++;
                    //verificam jucatorul iesit daca e bun 
                    checks = 1;
                }

                oldWinners.Add(drawing);
                winnersList.Add(drawing);
                checks = 0;
                draw = draw + 1;



            }


           

             WriteTheWinner(pathWinners, oldWinners);
             WriteTheWinner(pathNewWinners, winnersList);

            for (int i = 0; i < resultsDraws.Length; ++i)
            {
                Console.WriteLine("{0}: {1} ({2:p1})", i + 1, resultsDraws[i], (double)resultsDraws[i] / (double)totalDrawings);
            }



            // rngCsp.Dispose();
        }


        public static bool VerifyIfTheWinnerExists(long nrTickets, long drawWinner,List<long> nrWinners)
        {
            
            
            if (nrWinners != null)
            {
                var existingWinner = nrWinners.Find(element => element == drawWinner);
                if (existingWinner != 0)
                {
                    return true;
                }
                else return false;
            }
            else
            {
                return false;
            }
        }

        public static List<long> ReadTheWinners(string path)
        {
            List<long> oldWinners=new List<long>();
            string line = "";
            using (StreamReader sr = new StreamReader(path))
            {
                
                while ((line = sr.ReadLine()) != null)
                {
                    oldWinners.Add( Int64.Parse(line));
                }
            }
            Console.ReadKey();
            return oldWinners;
        }

        public static long CountTheLineFromTheWinners(string path)
        {
            int counting = 0;
            using (StreamReader sr = new StreamReader(path))
            {

                while ((sr.ReadLine()) != null)
                {
                    counting = counting + 1;
                }
            }
            Console.ReadKey();
            return counting;
        }

        private static void WriteTheWinner(string path, List<long> theWinners)
        {
            //ce se intampla cu cei existenti deja ?
            using (StreamWriter sw = new StreamWriter(path))
            {
                foreach (var winner in theWinners)
                {
                    sw.WriteLine(winner.ToString());
                }
                
            }
        }


        public static long DrawTicket(long numberTickets)
        {

             Guid randomNumber = Guid.NewGuid();
            if (numberTickets <= 0)
                throw new ArgumentOutOfRangeException("numberTickets");
            var hashCode=randomNumber.GetHashCode();
           
            do
            {
                hashCode = randomNumber.GetHashCode();
                hashCode = ExtractTheRandomNumber(hashCode, numberTickets);

                //rngCsp.GetHashCode();
            } while (IsFairDraw(hashCode, numberTickets));
            
            return (long)((hashCode % numberTickets) + 1);
        }

        public static int ExtractTheRandomNumber(int hashCode, long numberTickets)
        {
            //si ar fi nevoie si de extragerea a primelor 4 numere din nr dar inainte verificam asa
            if (hashCode < 0 || hashCode > 0)
            {
                hashCode = Math.Abs(hashCode);
                
            }
            //ar trebuii sa fie pt 0 ceva 

            return hashCode;
        }


        //public static bool IsFairDraw(long draw, long numTickets)
        //{
        //    long fullSetOfValues = long.MaxValue / numTickets;
        //    //putem verifica sa fie si mai mic decat nr de tickete
        //    return draw < numTickets * fullSetOfValues;
        //}

        public static bool IsFairDraw(long draw, long numTickets)
        {

            return draw < numTickets;
        }


    }
}
